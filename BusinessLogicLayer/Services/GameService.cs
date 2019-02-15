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
using AutoMapper;
using EntitiesLayer.Enums;
using BusinessLogicLayer.Constants;
using ViewModelsLayer.ViewModels.UserRoundViewModels;

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
        //Fisher–Yates shuffle
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

        private Deck CheckDeck(Deck deck)
        {
            if (deck.Cards.Count < BusinessLogicConstant._MinDeckSize)
            {
                deck.Cards.AddRange(deck.DiscardPile);
                deck.DiscardPile.RemoveRange(0, deck.DiscardPile.Count);
                _deckProvider.Update(new Deck { Cards = deck.Cards, DiscardPile = deck.DiscardPile });
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

        private async Task<bool> IsMoreThan17Points(User user, int roundId)
        {
            var moves = await _moveRepository.Get(user.Id, roundId);
            var cards = await _cardRepository.Get(moves);
            if (cards.Sum(card => card.CardValue) > BusinessLogicConstant._MaxDealerPoints)
            {
                return true;
            }
            return false;
        }

        private async Task<bool> IsGoldenPoint(IEnumerable<Move> moves)
        {
            var cards = await _cardRepository.Get(moves);
            bool flag = true;
            foreach(var item in cards)
            {
                if(item.CardName != CardName.Ace)
                {
                    flag = false;
                }
            }
            return flag;
        }

        private async Task<UserRound> CheckSpecialPoint(IEnumerable<Move> moves, UserRound userRound)
        {
            if (await IsBlackJack(moves))
            {
                userRound.Points += BusinessLogicConstant._BlackJackPointAtTheStart;
            }
            if (await IsGoldenPoint(moves))
            {
                userRound.Points += BusinessLogicConstant._GoldenPoint;
            }
            return userRound;
        }

        private async Task CompareUsercards(Round round)
        {
            var moves = await _moveRepository.Get(round);
            var userRounds = await _userRoundRepository.Get(round);
            var userGames = await _userGamesRepository.Get(round);
            var users = await _userRepository.Get(userGames);
            var userRoundsToUpdate = new List<UserRound>();
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            var dealerMoves = moves.Where(x => x.UserId == dealer.Id);
            var dealerCards = await _cardRepository.Get(dealerMoves);
            int dealerCardsSum = dealerCards.Sum(x => x.CardValue);
            var userRoundsExceptDealer = userRounds.Where(item => item.UserId != dealer.Id);
            var dealerUserRound = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);

            for (int i = 0; i < userRoundsExceptDealer.Count(); i++)
            {
                var playerMoves = moves.Where(x => x.UserId == userRounds.ElementAt(i).UserId);
                var cards = await _cardRepository.Get(playerMoves);
                int playerCardsSum = cards.Sum(x => x.CardValue);
                var currentUserRound = userRoundsExceptDealer.FirstOrDefault(x => x.UserId == userRounds.ElementAt(i).UserId);
                bool isBust = (playerCardsSum > BusinessLogicConstant._BlackjackCombination) && (dealerCardsSum > BusinessLogicConstant._BlackjackCombination);

                if ((playerCardsSum < dealerCardsSum) && (isBust))
                {
                    currentUserRound.Points += BusinessLogicConstant._OrdinaryPoint;
                    userRoundsToUpdate.Add(currentUserRound);
                }
                if ((playerCardsSum > dealerCardsSum) && (isBust))
                {
                    dealerUserRound.Points += BusinessLogicConstant._OrdinaryPoint;
                    userRoundsToUpdate.Add(dealerUserRound);
                }
                if (playerCardsSum > dealerCardsSum)
                {
                    currentUserRound.Points += BusinessLogicConstant._OrdinaryPoint;
                    userRoundsToUpdate.Add(currentUserRound);
                }
                if (playerCardsSum < dealerCardsSum)
                {
                    dealerUserRound.Points += BusinessLogicConstant._OrdinaryPoint;
                    userRoundsToUpdate.Add(dealerUserRound);
                }
            }
            if (userRoundsToUpdate.Count != 0)
            {
                await _userRoundRepository.UpdateRange(userRoundsToUpdate);
            }
        }

        private async Task CalculatePoints(Round round)
        {
            var userRounds = await _userRoundRepository.Get(round);
            var userGames = await _userGamesRepository.Get(round);
            var users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(user => user.UserRole == UserRole.Dealer);
            var userRoundsExceptDealer = userRounds.Where(item => item.UserId != dealer.Id);
            var userRoundDealer = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);
            var userRoundsToUpdate = new List<UserRound>();

            for (int i = 0; i < userRoundsExceptDealer.Count(); i++)
            {
                var currentUserRound = userRoundsExceptDealer.FirstOrDefault(x => x.UserId == userRounds.ElementAt(i).UserId);
                if (currentUserRound.Points > userRoundDealer.Points)
                {
                    currentUserRound.RoundStatus = RoundStatus.Winner;
                }
                if (currentUserRound.Points < userRoundDealer.Points)
                {
                    currentUserRound.RoundStatus = RoundStatus.Looser;
                }
                userRoundsToUpdate.Add(currentUserRound);
            }
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

        private List<ResponseUserViewModel> UserResponse(IEnumerable<User> users)
        {
            var handCards = _handCardsProvider.Get(users);
            var result = new List<ResponseUserViewModel>();

            for(int i = 0; i < users.Count(); i++)
            {
                var currentCards = _mapper.Map<List<ResponseCardViewModel>>(handCards.FirstOrDefault(x => x.User.Nickname == users.ElementAt(i).Nickname).Cards);
                result.Add(new ResponseUserViewModel
                {
                    Cards = currentCards,
                    Nickname = users.ElementAt(i).Nickname,
                    UserRole = users.ElementAt(i).UserRole
                });
            }
            return result;
        }

        private async Task<ResponseGameViewModel> GameResponse(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            if(game == null)
            {
                throw new NullReferenceException();
            }
            var deckFromCache = _deckProvider.Get();
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);

            var result = new ResponseGameViewModel
            {
                Id = gameId,
                Rounds = _mapper.Map<List<ResponseRoundViewModel>>(rounds),
                Users = _mapper.Map<List<ResponseUserViewModel>>(users),
                IsOver = false
            };
            result.Rounds = await ResponseRounds(result.Rounds, rounds);

            return result;
        }

        private async Task<List<ResponseRoundViewModel>> ResponseRounds(List<ResponseRoundViewModel> responseRounds, List<Round> rounds)
        {
            var userRounds = await _userRoundRepository.Get(rounds);
            for(int i = 0; i < responseRounds.Count; i++)
            {
                var round = rounds.FirstOrDefault(x => x.Id == responseRounds[i].RoundId);
                var currentUserRounds = userRounds.Where(x => x.RoundId == round.Id);
                responseRounds[i].UserRound = _mapper.Map<List<ResponseUserRoundViewModel>>(currentUserRounds);
            }
            return responseRounds;
        }
        #endregion

        #region Public Method
        public async Task<ResponseGameViewModel> GetGameById(int gameId)
        {
            ResponseGameViewModel result = await GameResponse(gameId);
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

            if (request.BotQuantity >= 0 && request.BotQuantity <= 5)
            {
                for (int i = 0; i < request.BotQuantity; i++)
                {
                    var bot = new User { Nickname = "Bot#" + (i + 1), UserRole = UserRole.BotPlayer };
                    bots.Add(bot);
                    _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = bot });
                }
            }

            if (dealer != null && peoplePlayer != null)
            {
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = peoplePlayer });
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = dealer });
            }
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

            await _userRepository.CreateRange(bots);

            for(int i = 0; i < bots.Count; i++)
            {
                userGames.Add(new UserGames { GameId = game.Id, UserId = bots[i].Id });
            }
            userGames.Add(new UserGames { GameId = game.Id, UserId = peoplePlayer.Id, Rate = request.UserRate });
            userGames.Add(new UserGames { GameId = game.Id, UserId = dealer.Id });

            await _userGamesRepository.CreateRange(userGames);
            _deckProvider.Add(new Deck { Cards = cards.ToList(), DiscardPile = new List<Card>() });
            await CreateNewRound(game.Id);

            ResponseGameViewModel result = await GameResponse(game.Id);
            return result;
        }

        public async Task<ResponseGameViewModel> CreateNewRound(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var round = new Round { GameId = gameId };
            await _roundRepository.Create(round);
            var userGames = (await _userGamesRepository.Get(game));
            var users = await _userRepository.Get(userGames);
            var userRounds = new List<UserRound>();

            CheckDeck(deckFromCache);

            for (int i = 0; i < users.Count(); i++)
            {
                userRounds.Add(new UserRound { RoundId = round.Id, UserId = users.ElementAt(i).Id });
            }

            await _userRoundRepository.CreateRange(userRounds);
            return await GameResponse(gameId);
        }
        //to self review
        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            //fields
            var result = await GameResponse(gameId);
            Deck deckFromCache = _deckProvider.Get();
            deckFromCache = CheckDeck(deckFromCache);
            var handCardsToCache = new List<HandCards>();
            var cardToUser = new List<Card>();
            var move = new Move();
            var moves = new List<Move>();
            Game game = await _gameRepository.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            List<Round> rounds = await _roundRepository.Get(game);
            List<UserRound> userRounds = await _userRoundRepository.Get(users);
            UserRound userRound;
            //Deal cards
            for (int i = 0; i < users.Count(); i++)
            {
                if (users.ElementAt(i).UserRole != UserRole.Dealer && users.ElementAt(i).UserRole != UserRole.None)
                {
                    //draw two cards from the deck
                    cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
                    handCardsToCache.Add(new HandCards { Cards = cardToUser, User = users.ElementAt(i) });
                    result.Users.FirstOrDefault(x => x.Nickname == users.ElementAt(i).Nickname).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);
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
                userRound = await CheckSpecialPoint(moves, userRound);
            }
            await _moveRepository.CreateRange(moves);
            moves.RemoveRange(0, moves.Count);
            //draw two cards from the deck to dealer
            cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
            handCardsToCache.Add(new HandCards { Cards = cardToUser, User = dealer });
            result.Users.FirstOrDefault(x => x.UserRole == UserRole.Dealer).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);
            deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);
            //save dealermoves
            move = new Move { RoundId = rounds.Last().Id, UserId = dealer.Id, CardId = cardToUser[0].Id };
            moves.Add(move);
            move = new Move { RoundId = rounds.Last().Id, UserId = dealer.Id, CardId = cardToUser[1].Id };
            moves.Add(move);
            await _moveRepository.CreateRange(moves);
            //update cache
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = new List<Card>() });
            _handCardsProvider.AddRange(handCardsToCache);
            //check special case
            userRound = userRounds.FirstOrDefault(x => x.UserId == dealer.Id);
            userRound = await CheckSpecialPoint(moves, userRound);

            return result;
        }
        //to self review
        public async Task<ResponseGameViewModel> DealCardToPlayer(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var user = users.FirstOrDefault(x => x.UserRole == UserRole.PeoplePlayer);
            var handCardsFromCache = _handCardsProvider.Get(user);
            var userRounds = await _userRoundRepository.Get(user.Id, rounds.Last().Id);
            var result = await GameResponse(gameId);

            //if user won or lost, then stop working
            if (userRounds.RoundStatus != RoundStatus.None)
            {
                result.Users = UserResponse(users);
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
                result.Users = UserResponse(users);
                await _moveRepository.Create(move);
                deckFromCache.DiscardPile.Add(deckFromCache.Cards.Last());
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
            }
            //check blackjack point
            if (await IsBlackJack(await _moveRepository.Get(user.Id, rounds.Last().Id)))
            {
                userRounds.Points += BusinessLogicConstant._BlackjackPoint;
            }
            //update deck
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });

            return result;
        }
        //to self review
        public async Task<ResponseGameViewModel> DealCardToDealer(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            var deckFromCache = _deckProvider.Get();
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            var handCardsFromCache = _handCardsProvider.Get(dealer);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userRounds = await _userRoundRepository.Get(rounds.Last());
            var moves = (await _moveRepository.Get(dealer.Id, rounds.Last().Id)).ToList();
            var result = await GameResponse(gameId);
            //if dealer has is more than 17 points, then stop working
            if (await IsMoreThan17Points(dealer, rounds.Last().Id))
            {
                result.Rounds.Last().IsOver = true;
                await CompareUsercards(rounds.Last());
                await CalculatePoints(rounds.Last());
                result.Users = UserResponse(users);
                return result;
            }
            //save move
            move = new Move { UserId = dealer.Id, RoundId = rounds.Last().Id, CardId = deckFromCache.Cards.Last().Id };
            await _moveRepository.Create(move);
            moves.Add(move);
            //update cache, game and get response
            handCardsFromCache.Cards.Add(deckFromCache.Cards.Last());
            _handCardsProvider.Update(handCardsFromCache);
            result.Users = UserResponse(users);
            deckFromCache.DiscardPile.Add(deckFromCache.Cards.Last());
            deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });
            await _gameRepository.Update(game);
            //check blackjack point
            if(await IsBlackJack(moves)) 
            {
                userRounds.FirstOrDefault(x => x.UserId == dealer.Id).Points += BusinessLogicConstant._BlackjackPoint;
            }
            result.IsOver = await GameIsOver(game);
            return result;
        }
        //to self review
        public async Task<ResponseGameViewModel> DealCardToBots(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userRounds = await _userRoundRepository.Get(rounds.Last());
            var bots = users.Where(x => x.UserRole == UserRole.BotPlayer);
            var moves = (await _moveRepository.Get(bots)).Where(x => x.RoundId == rounds.Last().Id).ToList();
            var handCardsFromCache = _handCardsProvider.Get(bots);
            var userRoundsToUpdate = new List<UserRound>();
            var movesToCreate = new List<Move>();
            //deal cards to bots
            for (int i = 0; i < bots.Count(); i++)
            {
                var item = bots.ElementAt(i);
                var currentUserRound = userRounds.FirstOrDefault(x => x.UserId == item.Id);
                //fake artificial intelligence
                //if random number equal zero, then skip this step
                if (new Random().Next(0, 2) == 0)
                {
                    continue;
                }
                //create new move and update cache
                move = new Move { RoundId = rounds.Last().Id, UserId = item.Id, CardId = deckFromCache.Cards.Last().Id };
                moves.Add(move);
                movesToCreate.Add(move);
                handCardsFromCache[i].Cards.Add(deckFromCache.Cards.Last());
                _handCardsProvider.Update(handCardsFromCache[i]);
                deckFromCache.DiscardPile.Add(deckFromCache.Cards.Last());
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
                //check blackjackpoint
                if (await IsBlackJack(moves.Where(x => x.UserId == item.Id)))
                {
                    currentUserRound.Points += BusinessLogicConstant._BlackjackPoint;
                    userRoundsToUpdate.Add(currentUserRound);
                }
            }
            //get response; save move and update userround; update deck from cache
            var result = await GameResponse(gameId);
            result.Users = UserResponse(users);
            await _moveRepository.CreateRange(movesToCreate);
            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });

            return result;
        }
        #endregion
    }
}