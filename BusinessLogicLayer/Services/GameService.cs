using System;
using System.Collections.Generic;
using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using DataAccessLayer.Interfaces;
using BusinessLogicLayer.Providers;
using BusinessLogicLayer.DTOs;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;
using System.Linq;
using ViewModelsLayer.ViewModels.CardViewModels;
using ViewModelsLayer.ViewModels.GameViewModels;
using ViewModelsLayer.ViewModels.RoundViewModels;
using ViewModelsLayer.ViewModels.UserViewModels;
using ViewModelsLayer.ViewModels.ReplenishCashViewModel;
using ViewModelsLayer.ViewModels.DealCardsToBotViewModel;
using AutoMapper;
using EntitiesLayer.Enums;
using BusinessLogicLayer.Constants;
using ViewModelsLayer.ViewModels.UserRoundViewModels;
using ViewModelsLayer.ViewModels.UserGameViewModels;
using ViewModelsLayer.ViewModels.GameOverViewModel;

namespace BusinessLogicLayer.Services
{
    public class GameService : IGameService
    {
        #region Fields
        private IGameRepository _gameRepository;
        private ICardRepository _cardRepository;
        private IRoundRepository _roundRepository;
        private IMoveRepository _moveRepository;
        private IUserGamesRepository _userGamesRepository;
        private IUserRepository _userRepository;
        private IUserRoundRepository _userRoundRepository;
        private IMapper _mapper;
        private DeckProvider _deckProvider;
        private HandCardsProvider _handCardsProvider;
        #endregion

        #region Constructor
        public GameService(IGameRepository gameRepository, ICardRepository cardRepository, IRoundRepository roundRepository, IMoveRepository moveRepository, IUserGamesRepository userGamesRepository, IUserRepository userRepository, IUserRoundRepository userRoundRepository, IMemoryCache cache, IMapper mapper)
        {
            _gameRepository = gameRepository;
            _cardRepository = cardRepository;
            _roundRepository = roundRepository;
            _moveRepository = moveRepository;
            _userGamesRepository = userGamesRepository;
            _userRepository = userRepository;
            _userRoundRepository = userRoundRepository;
            _mapper = mapper;
            _deckProvider = new DeckProvider(cache);
            _handCardsProvider = new HandCardsProvider(cache);
        }
        #endregion

        #region Private Method
        //Fisher–Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        private List<Card> Reshuffle(List<Card> Deck)
        {
            Random rand = new Random();
            for (int i = Deck.Count - 1; i >= 1; i--)
            {
                int j = rand.Next(i + 1);
                Card buffer = Deck[j];
                Deck[j] = Deck[i];
                Deck[i] = buffer;
            }
            return Deck;
        }

        private Deck CheckDeck(Deck deck, int gameId)
        {
            //If the number of cards in the deck is less than the #_MinDeckSize, then add cards from the discard pile to the deck and reshuffle it
            if (deck.Cards.Count < BusinessLogicConstant._MinDeckSize)
            {
                deck.Cards.AddRange(deck.DiscardPile);
                deck.DiscardPile.RemoveRange(0, deck.DiscardPile.Count);
                deck.Cards = Reshuffle(deck.Cards);
                _deckProvider.Update(new Deck { Cards = deck.Cards, DiscardPile = deck.DiscardPile }, gameId);
            }
            return deck;
        }

        private async Task<bool> IsBlackJack(IEnumerable<Move> moves)
        {
            var cards = await _cardRepository.Get(moves);

            if (cards.Sum(card => card.CardValue) == BusinessLogicConstant._BlackjackCombination)
            {
                return true;
            }
            return false;
        }

        private async Task<bool> IsBust(IEnumerable<Move> moves)
        {
            var cards = await _cardRepository.Get(moves);

            if (cards.Sum(card => card.CardValue) > BusinessLogicConstant._BlackjackCombination)
            {
                return true;
            }
            return false;
        }

        private async Task<bool> IsMoreThan17Points(IEnumerable<Move> moves)
        {
            var cards = await _cardRepository.Get(moves);
            if (cards.Sum(card => card.CardValue) > BusinessLogicConstant._MaxDealerPoints)
            {
                return true;
            }
            return false;
        }

        private async Task<bool> IsGoldenPoint(IEnumerable<Move> moves)
        {
            if(moves.Count() == 0)
            {
                return false;
            }
            var cards = await _cardRepository.Get(moves);
            bool flag = true;
            //Returns true only if two aces are taken.
            foreach (var item in cards)
            {
                if(item.CardName != CardName.Ace)
                {
                    flag = false;
                }
            }
            return flag;
        }

        private async Task CheckSpecialPoint(IEnumerable<Move> moves, UserRound userRound)
        {
            if (await IsBlackJack(moves))
            {
                userRound.Points = BusinessLogicConstant._BlackJackPointAtTheStart;

            }
            if (await IsGoldenPoint(moves))
            {
                userRound.Points = BusinessLogicConstant._GoldenPoint;
            }
            await _userRoundRepository.Update(userRound);
            return;
        }

        private async Task<List<ResponseGameOverViewModel>> GameOverResponse(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);
            var userRounds = await _userRoundRepository.Get(rounds);
            int winsQuantity = 0;
            List<ResponseGameOverViewModel> result = new List<ResponseGameOverViewModel>();

            for (int i = 0; i < users.Count; i++)
            {
                //the dealer isn't included in this statistic
                if (users[i].UserRole == UserRole.Dealer)
                {
                    continue;
                }
                var currentUserRounds = userRounds.Where(item => item.UserId == users[i].Id);
                IEnumerable<UserRound> wins = currentUserRounds.Where(x => x.RoundStatus == RoundStatus.Winner);
                //To avoid an exception
                if (wins == null)
                {
                    winsQuantity = 0;
                }
                if (wins != null)
                {
                    winsQuantity = wins.Count();
                }
                result.Add(new ResponseGameOverViewModel { UserId = users[i].Id, Username = users[i].Nickname, WinsQuantity = winsQuantity });
            }

            return result;
        }

        private async Task DistributeMoney(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            var userGames = await _userGamesRepository.Get(game);
            List<ResponseGameOverViewModel> userStatistic = await GameOverResponse(gameId);
            List<int> userIds = userStatistic.Select(item => item.UserId).ToList();
            var users = await _userRepository.Get(userIds);
            //take the first player with the max number of wins
            ResponseGameOverViewModel firstWinner = userStatistic.OrderByDescending(item => item.WinsQuantity).FirstOrDefault();
            //take players by #firstWinner
            List<ResponseGameOverViewModel> winners = userStatistic.Where(item => item.WinsQuantity == firstWinner.WinsQuantity).ToList();
            List<ResponseGameOverViewModel> loosers = userStatistic.Except(winners).ToList();
            List<User> usersToUpdate = new List<User>();

            for(int i = 0; i < userStatistic.Count; i++)
            {
                //if the current player is one of the losers, then take away his money
                if (loosers.Select(item => item.UserId).Contains(userStatistic[i].UserId))
                {
                    var looser = users.FirstOrDefault(item => item.Id == userStatistic[i].UserId);
                    var looserUserGame = userGames.FirstOrDefault(item => item.UserId == looser.Id);
                    looser.Cash -= looserUserGame.Rate;
                    usersToUpdate.Add(looser);
                }
                //if the current player is from the winners, then give him money
                if (winners.Select(item=> item.UserId).Contains(userStatistic[i].UserId))
                {
                    var winner = users.FirstOrDefault(item => item.Id == userStatistic[i].UserId);
                    var winnerUserGame = userGames.FirstOrDefault(item => item.UserId == winner.Id);
                    winner.Cash += winnerUserGame.Rate;
                    usersToUpdate.Add(winner);
                }
            }
            await _userRepository.UpdateRange(usersToUpdate); 
        }

        private async Task SetRoundStatus(Round round)
        {
            var userRounds = await _userRoundRepository.Get(round);
            var userGames = await _userGamesRepository.Get(round);
            var users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(user => user.UserRole == UserRole.Dealer);
            var userRoundsExceptDealer = userRounds.Where(item => item.UserId != dealer.Id);
            var userRoundDealer = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);
            var userRoundsToUpdate = new List<UserRound>();
            bool dealerIsBusted = (userRoundDealer.Points > BusinessLogicConstant._BlackjackCombination) && (userRoundDealer.Points < BusinessLogicConstant._BlackjackPoint);
            bool dealerHasSpecialPoint = userRoundDealer.Points >= BusinessLogicConstant._BlackjackPoint;

            for (int i = 0; i < userRoundsExceptDealer.Count(); i++)
            {
                var currentUserRound = userRoundsExceptDealer.FirstOrDefault(item => item.UserId == userRoundsExceptDealer.ElementAt(i).UserId);
                
                bool playerIsBusted = (currentUserRound.Points > BusinessLogicConstant._BlackjackCombination) && (currentUserRound.Points < BusinessLogicConstant._BlackjackPoint);
                bool bothIsBusted = dealerIsBusted && playerIsBusted;

                if(userRoundDealer.Points == currentUserRound.Points)
                {
                    currentUserRound.RoundStatus = RoundStatus.Standoff;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if((userRoundDealer.Points > currentUserRound.Points) && bothIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatus.Winner;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if((userRoundDealer.Points < currentUserRound.Points) && bothIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatus.Looser;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(playerIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatus.Looser;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(dealerIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatus.Winner;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(currentUserRound.Points > userRoundDealer.Points)
                {
                    currentUserRound.RoundStatus = RoundStatus.Winner;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(currentUserRound.Points < userRoundDealer.Points)
                {
                    currentUserRound.RoundStatus = RoundStatus.Looser;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
            }

            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
        }

        public async Task<bool> GameIsOver(Game game)
        {
            var rounds = await _roundRepository.Get(game);
            if (game.RoundQuantity == rounds.Count())
            {
                return true;
            }
            return false;
        }

        private async Task<ResponseGameViewModel> GameResponse(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            if(game == null)
            {
                throw new NullReferenceException();
            }

            Deck deckFromCache = _deckProvider.Get(gameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);

            var result = new ResponseGameViewModel
            {
                Id = gameId,
                Rounds = _mapper.Map<List<ResponseRoundViewModel>>(rounds),
                Users = _mapper.Map<List<ResponseUserViewModel>>(users),
                UserGames = _mapper.Map<List<ResponseUserGameViewModel>>(userGames),
            };

            result.IsOver = await GameIsOver(game);
            result.Rounds = await ResponseRounds(result.Rounds, rounds);
            result.Users = await ResponseUserCardViewModels(result.Users, result.Rounds.Last().RoundId);

            return result;
        }

        private async Task<List<ResponseUserViewModel>> ResponseUserCardViewModels(List<ResponseUserViewModel> responses, int gameId)
        {
            var userIds = responses.Select(x => x.Id).ToList();
            var users = await _userRepository.Get(userIds);
            var moves = await _moveRepository.Get(users, gameId);
            var cards = await _cardRepository.Get(moves);

            for(int i = 0; i < responses.Count; i++)
            {
                var userCards = moves.Where(item => item.UserId == responses[i].Id).ToList();
                var currentCards = cards.Where(item => userCards.Select(move => move.CardId).Contains(item.Id)).ToList();
                responses[i].Cards = _mapper.Map<List<ResponseCardViewModel>>(currentCards);
            }

            return responses;
        }

        private async Task<List<ResponseRoundViewModel>> ResponseRounds(List<ResponseRoundViewModel> responseRounds, List<Round> rounds)
        {
            var userRounds = await _userRoundRepository.Get(rounds);
            List<int> userIds = userRounds.Select(item => (int)item.UserId).ToList();
            var users = await _userRepository.Get(userIds);

            for(int i = 0; i < responseRounds.Count; i++)
            {
                var round = rounds.FirstOrDefault(item => item.Id == responseRounds[i].RoundId);
                var currentUserRounds = userRounds.Where(item => item.RoundId == round.Id);
                responseRounds[i].UserRound = _mapper.Map<List<ResponseUserRoundViewModel>>(currentUserRounds);
                responseRounds[i].UserRound = MapNicknameToUserRounds(responseRounds[i].UserRound, users);
            }
            return responseRounds;
        }

        private List<ResponseUserRoundViewModel> MapNicknameToUserRounds(List<ResponseUserRoundViewModel> userRounds, List<User> users)
        {
            for(int i = 0; i < userRounds.Count; i++)
            {
                var currentUser = users.FirstOrDefault(item => item.Id == userRounds[i].UserId);
                userRounds[i].Nickname = currentUser.Nickname;
            }
            return userRounds;
        }
        #endregion

        #region Public Method
        public async Task<ResponseGameViewModel> GetGameById(int gameId)
        {
            ResponseGameViewModel result = await GameResponse(gameId);
            return result;
        }

        public async Task<int> ReplenishCash(RequestReplenishCashViewModel request)
        {
            var game = await _gameRepository.Get(request.GameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var userToChange = users.FirstOrDefault(item => item.UserRole == UserRole.PeoplePlayer);
            userToChange.Cash += request.Cash;
            await _userRepository.Update(userToChange);
            return userToChange.Cash;
        }

        public async Task<List<ResponseGameOverViewModel>> GameOver(int gameId)
        {
            var result = await GameOverResponse(gameId);
            return result;
        }

        public async Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request)
        {
            var game = new Game();
            var cards = await _cardRepository.Get();
            cards = this.Reshuffle(cards.ToList());
            var userGames = new List<UserGames>();
            var bots = new List<User>();
            var peoplePlayer = await _userRepository.Get(request.User.Nickname);
            var dealer = await _userRepository.Get(BusinessLogicConstant._DealerNickname);
            game.RoundQuantity = request.RoundQuantity;
            await _gameRepository.Create(game);

            //if the number of bots is less than 0 or more than 4, then bots don't create
            if (request.BotQuantity >= BusinessLogicConstant._MinNumberOfBots && request.BotQuantity <= BusinessLogicConstant._MaxNumberOfBots)
            {
                for (int i = 0; i < request.BotQuantity; i++)
                {
                    var bot = new User { Nickname = "Bot#" + (i + 1), UserRole = UserRole.BotPlayer };
                    bots.Add(bot);
                    _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = bot });
                }
                await _userRepository.CreateRange(bots);
            }
            //if the dealer or player already exists, then use them
            if (dealer != null && peoplePlayer != null)
            {
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = peoplePlayer });
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = dealer });
            }
            //if there is no dealer or player yet, then create them
            if (dealer == null)
            {
                dealer = new User { Nickname = BusinessLogicConstant._DealerNickname, UserRole = UserRole.Dealer };
                await _userRepository.Create(dealer);
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = dealer });
            }
            if (peoplePlayer == null)
            {
                peoplePlayer = new User { Nickname = request.User.Nickname, UserRole = UserRole.PeoplePlayer };
                await _userRepository.Create(peoplePlayer);
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = peoplePlayer });
            }
            //create usergames, new gamedeck and new round
            for(int i = 0; i < bots.Count; i++)
            {
                userGames.Add(new UserGames { GameId = game.Id, UserId = bots[i].Id });
            }
            userGames.Add(new UserGames { GameId = game.Id, UserId = peoplePlayer.Id, Rate = request.UserRate });
            userGames.Add(new UserGames { GameId = game.Id, UserId = dealer.Id });

            await _userGamesRepository.CreateRange(userGames);
            _deckProvider.Add(new Deck { Cards = cards.ToList(), DiscardPile = new List<Card>() }, game.Id);
            await CreateNewRound(game.Id);

            ResponseGameViewModel result = await GameResponse(game.Id);
            return result;
        }

        public async Task<ResponseGameViewModel> CreateNewRound(int gameId)
        {
            Deck deckFromCache = _deckProvider.Get(gameId);
            var game = await _gameRepository.Get(gameId);
            var round = new Round { GameId = gameId };
            await _roundRepository.Create(round);
            var userGames = (await _userGamesRepository.Get(game));
            var users = await _userRepository.Get(userGames);
            List<HandCards> handCardsFromCache = _handCardsProvider.Get(users);
            var userRounds = new List<UserRound>();

            CheckDeck(deckFromCache, gameId);

            for (int i = 0; i < users.Count(); i++)
            {
                deckFromCache.DiscardPile.AddRange(handCardsFromCache[i].Cards);
                handCardsFromCache[i].Cards.RemoveRange(0, handCardsFromCache[i].Cards.Count);
                userRounds.Add(new UserRound { RoundId = round.Id, UserId = users.ElementAt(i).Id });
                _handCardsProvider.Update(handCardsFromCache[i]);
            }

            _deckProvider.Update(deckFromCache, gameId);
            await _userRoundRepository.CreateRange(userRounds);
            return await GameResponse(gameId);
        }

        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            //fields
            ResponseGameViewModel result = await GameResponse(gameId);
            Deck deckFromCache = _deckProvider.Get(gameId);
            deckFromCache = CheckDeck(deckFromCache, gameId);
            var handCardsToCache = new List<HandCards>();
            var cardToUser = new List<Card>();
            var move = new Move();
            var moves = new List<Move>();
            Game game = await _gameRepository.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            UserRound userRound;
            List<User> users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(item => item.UserRole == UserRole.Dealer);
            List<Round> rounds = await _roundRepository.Get(game);
            List<UserRound> userRounds = (await _userRoundRepository.Get(users)).Where(item => item.RoundId == rounds.Last().Id).ToList();
            //Deal cards
            for (int i = 0; i < users.Count(); i++)
            {
                if (users.ElementAt(i).UserRole != UserRole.Dealer && users.ElementAt(i).UserRole != UserRole.None)
                {
                    //draw two cards from the deck
                    cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
                    handCardsToCache.Add(new HandCards { Cards = cardToUser, User = users.ElementAt(i) });
                    result.Users.FirstOrDefault(item => item.Nickname == users.ElementAt(i).Nickname).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);
                    deckFromCache.DiscardPile.AddRange(cardToUser);
                    deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);
                    //save new moves
                    move = new Move { RoundId = rounds.Last().Id, UserId = users.ElementAt(i).Id, CardId = cardToUser[0].Id };
                    moves.Add(move);
                    move = new Move { RoundId = rounds.Last().Id, UserId = users.ElementAt(i).Id, CardId = cardToUser[1].Id };
                    moves.Add(move);
                }
                //check special case
                userRound = userRounds.FirstOrDefault(item => item.UserId == users.ElementAt(i).Id);
                userRound.Points += cardToUser.Sum(card => card.CardValue);
                await CheckSpecialPoint(moves, userRound);
            }
            await _moveRepository.CreateRange(moves);
            moves.RemoveRange(0, moves.Count);
            //draw two cards from the deck to dealer
            cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
            handCardsToCache.Add(new HandCards { Cards = cardToUser, User = dealer });
            result.Users.FirstOrDefault(item => item.UserRole == UserRole.Dealer).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);
            deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);
            //save dealermoves
            move = new Move { RoundId = rounds.Last().Id, UserId = dealer.Id, CardId = cardToUser[0].Id };
            moves.Add(move);
            move = new Move { RoundId = rounds.Last().Id, UserId = dealer.Id, CardId = cardToUser[1].Id };
            moves.Add(move);
            await _moveRepository.CreateRange(moves);
            //update cache
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile }, gameId);
            _handCardsProvider.AddRange(handCardsToCache);
            //check special case
            userRound = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);
            userRound.Points += cardToUser.Sum(card => card.CardValue);
            await CheckSpecialPoint(moves, userRound);
            result = await GameResponse(game.Id);

            return result;
        }

        public async Task<ResponseGameViewModel> DealCardToPlayer(int gameId)
        {
            Deck deckFromCache = _deckProvider.Get(gameId);
            var game = await _gameRepository.Get(gameId);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var user = users.FirstOrDefault(item => item.UserRole == UserRole.PeoplePlayer);
            HandCards handCardsFromCache = _handCardsProvider.Get(user);
            var userRound = await _userRoundRepository.Get(user.Id, rounds.Last().Id);
            ResponseGameViewModel result = await GameResponse(gameId);

            //if user won or lost, then stop working
            if (userRound.RoundStatus != RoundStatus.None || userRound.Points >= BusinessLogicConstant._BlackjackPoint)
            {
                return result;
            }
            //deal card
            if (user != null)
            {
                //add card to hand and update cache
                move = new Move { UserId = user.Id, RoundId = rounds.Last().Id, CardId = deckFromCache.Cards.Last().Id };
                handCardsFromCache.Cards.Add(deckFromCache.Cards.Last());
                _handCardsProvider.Update(handCardsFromCache);
                //get response and save move
                await _moveRepository.Create(move);
                userRound.Points += deckFromCache.Cards.Last().CardValue;
                deckFromCache.DiscardPile.Add(deckFromCache.Cards.Last());
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
            }
            //update deck
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile }, gameId);
            await _userRoundRepository.Update(userRound);
            result = await GameResponse(game.Id);

            return result;
        }

        public async Task<ResponseGameViewModel> DealCardToDealer(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            Deck deckFromCache = _deckProvider.Get(gameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(item => item.UserRole == UserRole.Dealer);
            HandCards handCardsFromCache = _handCardsProvider.Get(dealer);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userRound = await _userRoundRepository.Get(dealer.Id, rounds.Last().Id);
            var moves = (await _moveRepository.Get(dealer.Id, rounds.Last().Id)).ToList();
            ResponseGameViewModel result = await GameResponse(gameId);
            bool takeNextCard = true;

            while (takeNextCard)
            {
                bool isMoreThan17Points = await IsMoreThan17Points(moves);
                bool gameIsOver = await GameIsOver(game);
                result.IsOver = gameIsOver;
                //if dealer has is more than 17 points, then stop working
                if ((isMoreThan17Points && gameIsOver) || ((userRound.Points >= BusinessLogicConstant._BlackjackPoint) && gameIsOver))
                {
                    await SetRoundStatus(rounds.Last());
                    await DistributeMoney(gameId);
                    result = await GameResponse(gameId);
                    result.Rounds.Last().IsOver = true;
                    takeNextCard = false;
                    return result;
                }
                if (isMoreThan17Points || (userRound.Points >= BusinessLogicConstant._BlackjackPoint))
                {
                    await SetRoundStatus(rounds.Last());
                    result = await GameResponse(gameId);
                    result.Rounds.Last().IsOver = true;
                    takeNextCard = false;
                    return result;
                }
                //save move
                move = new Move { UserId = dealer.Id, RoundId = rounds.Last().Id, CardId = deckFromCache.Cards.Last().Id };
                await _moveRepository.Create(move);
                moves.Add(move);
                userRound.Points += deckFromCache.Cards.Last().CardValue;
                //update cache, game and get response
                handCardsFromCache.Cards.Add(deckFromCache.Cards.Last());
                _handCardsProvider.Update(handCardsFromCache);
                deckFromCache.DiscardPile.Add(deckFromCache.Cards.Last());
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
                _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile }, gameId);
            }
            await _userRoundRepository.Update(userRound);
            result = await GameResponse(gameId);
            result.IsOver = await GameIsOver(game);
            return result;
        }

        public async Task<ResponseGameViewModel> DealCardsToBot(RequestDealCardsToBotViewModel request)
        {
            Deck deckFromCache = _deckProvider.Get(request.GameId);
            var game = await _gameRepository.Get(request.GameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userRound = await _userRoundRepository.Get(request.UserId, rounds.Last().Id);
            var bot = await _userRepository.Get(request.UserId);
            var moves = await _moveRepository.Get(request.UserId, rounds.Last().Id);
            HandCards handCardsFromCache = _handCardsProvider.Get(bot);
            var movesToCreate = new List<Move>();
            var allBotCards = await _cardRepository.Get(moves);
            ResponseGameViewModel result = await GameResponse(request.GameId);
            //
            bool takeNextCard = true;

            if (userRound.RoundStatus != RoundStatus.None || userRound.Points >= BusinessLogicConstant._BlackjackPoint)
            {
                return result;
            }

            //deal cards to bots
            while (takeNextCard)
            {
                int sumCards = allBotCards.Sum(card => card.CardValue);
                int randomValue = new Random().Next(0, 2);
                Card currentCard = deckFromCache.Cards.Last();
                if ((sumCards > BusinessLogicConstant._MaxBotsPoints && randomValue == 0) || sumCards >= BusinessLogicConstant._BlackjackCombination)
                {
                    takeNextCard = false;
                    break;
                }
                //create new move and update cache
                move = new Move { RoundId = rounds.Last().Id, UserId = bot.Id, CardId = currentCard.Id };
                userRound.Points += currentCard.CardValue;
                allBotCards.Add(currentCard);
                moves.Add(move);
                movesToCreate.Add(move);
                handCardsFromCache.Cards.Add(currentCard);
                _handCardsProvider.Update(handCardsFromCache);
                deckFromCache.DiscardPile.Add(currentCard);
                deckFromCache.Cards.Remove(currentCard);
            }
            await _userRoundRepository.Update(userRound);
            await _moveRepository.CreateRange(movesToCreate);
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile }, request.GameId);
            result = await GameResponse(game.Id);
            return result;
        }
        #endregion
    }
}