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
            List<Card> deckCards = deck.Cards;
            List<Card> deckDiscardPile = deck.DiscardPile;

            int deckCardsCount = deckCards.Count;
            int deckDiscardPileCount = deck.DiscardPile.Count;

            if (deckCardsCount < BusinessLogicConstant._MinDeckSize)
            {
                deckCards.AddRange(deckDiscardPile);
                deckDiscardPile.RemoveRange(0, deckDiscardPileCount);
                deck.Cards = Reshuffle(deckCards);

                var deckToUpdate = new Deck();
                deckToUpdate.Cards = deckCards;
                deckToUpdate.DiscardPile = deckDiscardPile;

                _deckProvider.Update(deckToUpdate, gameId);
            }

            return deck;
        }

        private async Task<bool> CheckBlackJackPoint(IEnumerable<Move> moves)
        {
            List<Card> cards = await _cardRepository.Get(moves);

            bool isBlackJackPoint = false;

            int cardsSum = cards.Sum(card => card.CardValue);

            if (cardsSum == BusinessLogicConstant._BlackjackCombination)
            {
                isBlackJackPoint = true;
                return isBlackJackPoint;
            }

            return isBlackJackPoint;
        }

        private async Task<bool> CheckBustedCards(IEnumerable<Move> moves)
        {
            List<Card> cards = await _cardRepository.Get(moves);

            bool isBust = false;

            int cardsSum = cards.Sum(card => card.CardValue);

            if (cardsSum > BusinessLogicConstant._BlackjackCombination)
            {
                isBust = true;
                return isBust;
            }

            return isBust;
        }

        private async Task<bool> CheckDealerPoints(IEnumerable<Move> moves)
        {
            IEnumerable<Card> cards = await _cardRepository.Get(moves);

            int cardsSum = cards.Sum(card => card.CardValue);

            bool isMoreThan17Points = false;

            if (cardsSum > BusinessLogicConstant._MaxDealerPoints)
            {
                isMoreThan17Points = true;
                return isMoreThan17Points;
            }

            return isMoreThan17Points;
        }
 
        private async Task<bool> CheckGoldenPoint(IEnumerable<Move> moves)
        {
            if (moves.Count() == 0)
            {
                return false;
            }

            IEnumerable<Card> cards = await _cardRepository.Get(moves);

            bool isGoldenPoint = true;

            foreach (var card in cards)
            {
                if(card.CardName != CardName.Ace)
                {
                    isGoldenPoint = false;
                }
            }

            return isGoldenPoint;
        }

        private async Task CheckSpecialPoint(IEnumerable<Move> moves, UserRound userRound)
        {
            bool isBlackJack = await CheckBlackJackPoint(moves);
            bool isGoldenPoint = await CheckGoldenPoint(moves);

            if (isBlackJack)
            {
                userRound.Points = BusinessLogicConstant._BlackJackPointAtTheStart;

            }

            if (isGoldenPoint)
            {
                userRound.Points = BusinessLogicConstant._GoldenPoint;
            }

            await _userRoundRepository.Update(userRound);

            return;
        }

        private async Task<List<ResponseGameOverViewModel>> GameOverResponse(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);
            if (game == null)
            {
                throw new NullReferenceException();
            }

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);
            List<Round> rounds = await _roundRepository.Get(game);
            List<UserRound> userRounds = await _userRoundRepository.Get(rounds);

            List<ResponseGameOverViewModel> result = new List<ResponseGameOverViewModel>();

            int winsQuantity = 0;

            foreach (User user in users)
            {
                if (user.UserRole == UserRole.Dealer)
                {
                    continue;
                }

                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.UserId == user.Id);
                IEnumerable<UserRound> wins = currentUserRounds.Where(x => x.RoundStatus == RoundStatus.Winner);

                if (wins == null)
                {
                    winsQuantity = 0;
                }

                if (wins != null)
                {
                    winsQuantity = wins.Count();
                }

                var itemToResult = new ResponseGameOverViewModel();

                itemToResult.UserId = user.Id;
                itemToResult.Username = user.Nickname;
                itemToResult.WinsQuantity = winsQuantity;

                result.Add(itemToResult);
            }

            return result;
        }

        private async Task DistributeMoney(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);
            IEnumerable<UserGames> userGames = await _userGamesRepository.Get(game);

            IEnumerable<ResponseGameOverViewModel> gameStatistic = await GameOverResponse(gameId);
            List<int> userIds = gameStatistic.Select(item => item.UserId).ToList();

            IEnumerable<User> users = await _userRepository.Get(userIds);

            ResponseGameOverViewModel firstAvailableWinner = gameStatistic.OrderByDescending(item => item.WinsQuantity).FirstOrDefault();
            IEnumerable<ResponseGameOverViewModel> winners = gameStatistic.Where(item => item.WinsQuantity == firstAvailableWinner.WinsQuantity);
            IEnumerable<ResponseGameOverViewModel> loosers = gameStatistic.Except(winners);

            List<User> usersToUpdate = new List<User>();

            foreach(var userStatistic in gameStatistic)
            {
                IEnumerable<int> loosersIds = loosers.Select(statistic => statistic.UserId);
                IEnumerable<int> winnersIds = winners.Select(statistic => statistic.UserId);

                int userStatisticUserId = userStatistic.UserId;

                if (loosersIds.Contains(userStatisticUserId))
                {
                    User looser = users.FirstOrDefault(item => item.Id == userStatisticUserId);
                    UserGames looserUserGame = userGames.FirstOrDefault(item => item.UserId == looser.Id);

                    int looserUserGameRate = looserUserGame.Rate;

                    looser.Cash -= looserUserGameRate;
                    usersToUpdate.Add(looser);
                }

                if (winnersIds.Contains(userStatisticUserId))
                {
                    User winner = users.FirstOrDefault(item => item.Id == userStatisticUserId);
                    UserGames winnerUserGame = userGames.FirstOrDefault(item => item.UserId == winner.Id);

                    int winnerUserGameRate = winnerUserGame.Rate;

                    winner.Cash += winnerUserGame.Rate;
                    usersToUpdate.Add(winner);
                }
            }

            await _userRepository.UpdateRange(usersToUpdate); 
        }

        private async Task SetRoundStatus(Round round)
        {
            List<UserRound> userRounds = await _userRoundRepository.Get(round);
            List<UserGames> userGames = await _userGamesRepository.Get(round);
            List<User> users = await _userRepository.Get(userGames);

            User dealer = users.FirstOrDefault(user => user.UserRole == UserRole.Dealer);
            IEnumerable<UserRound> userGamesExceptDealer = userRounds.Where(item => item.UserId != dealer.Id);
            UserRound userRoundDealer = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);

            var userRoundsToUpdate = new List<UserRound>();

            bool dealerIsBusted = (userRoundDealer.Points > BusinessLogicConstant._BlackjackCombination) && (userRoundDealer.Points < BusinessLogicConstant._BlackjackPoint);
            bool dealerHasSpecialPoint = userRoundDealer.Points >= BusinessLogicConstant._BlackjackPoint;

            foreach(var userGame in userGamesExceptDealer)
            {
                UserRound currentUserRound = userRounds.FirstOrDefault(item => item.UserId == userGame.UserId);
                
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

        private async Task<bool> CheckGameOver(Game game)
        {
            IEnumerable<Round> rounds = await _roundRepository.Get(game);

            bool gameIsOver = false;

            if (game.RoundQuantity == rounds.Count())
            {
                gameIsOver = true;
                return gameIsOver;
            }

            return gameIsOver;
        }

        private async Task<ResponseGameViewModel> GameResponse(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);
            if(game == null)
            {
                throw new NullReferenceException();
            }

            Deck deckFromCache = _deckProvider.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);
            List<Round> rounds = await _roundRepository.Get(game);

            var result = new ResponseGameViewModel();

            result.Id = gameId;
            result.Rounds = _mapper.Map<List<ResponseRoundViewModel>>(rounds);
            result.Users = _mapper.Map<List<ResponseUserViewModel>>(users);
            result.UserGames = _mapper.Map<List<ResponseUserGameViewModel>>(userGames);

            result.IsOver = await CheckGameOver(game);
            result.Rounds = await ResponseRounds(result.Rounds, rounds);

            List<ResponseRoundViewModel> roundResult = result.Rounds;
            ResponseRoundViewModel resultRoundsLast = roundResult.Last();

            result.Users = await ResponseUserCardViewModels(result.Users, resultRoundsLast.RoundId);

            return result;
        }

        private async Task<List<ResponseUserViewModel>> ResponseUserCardViewModels(List<ResponseUserViewModel> responses, int gameId)
        {
            List<int> userIds = responses.Select(x => x.Id).ToList();

            IEnumerable<User> users = await _userRepository.Get(userIds);
            IEnumerable<Move> moves = await _moveRepository.Get(users, gameId);
            IEnumerable<Card> cards = await _cardRepository.Get(moves);

            foreach(var user in responses)
            {
                IEnumerable<Move> userCards = moves.Where(move => move.UserId == user.Id);
                IEnumerable<int> cardsIds = userCards.Select(move => move.CardId);
                IEnumerable<Card> currentCards = cards.Where(card => cardsIds.Contains(card.Id));
                user.Cards = _mapper.Map<List<ResponseCardViewModel>>(currentCards);
            }

            return responses;
        }

        private async Task<List<ResponseRoundViewModel>> ResponseRounds(List<ResponseRoundViewModel> responseRounds, List<Round> rounds)
        {
            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(rounds);

            List<int> userIds = userRounds.Select(item => (int)item.UserId).ToList();
            List<User> users = await _userRepository.Get(userIds);

            foreach(var responseRound in responseRounds)
            {
                Round round = rounds.FirstOrDefault(item => item.Id == responseRound.RoundId);
                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.RoundId == round.Id);

                responseRound.UserRound = _mapper.Map<List<ResponseUserRoundViewModel>>(currentUserRounds);
                responseRound.UserRound = MapNicknameToUserRounds(responseRound.UserRound, users);
            }

            return responseRounds;
        }

        private List<ResponseUserRoundViewModel> MapNicknameToUserRounds(List<ResponseUserRoundViewModel> userRounds, List<User> users)
        {
            for(int i = 0; i < userRounds.Count; i++)
            {
                if(userRounds[i] == null)
                {
                    throw new NullReferenceException();
                }

                int currentUserId = userRounds[i].UserId;
                User currentUser = users.FirstOrDefault(item => item.Id == currentUserId);
                string currentUserNickname = currentUser.Nickname;

                userRounds[i].Nickname = currentUserNickname;
            }

            return userRounds;
        }

        private void CreateHandCards(User user)
        {
            var handCards = new HandCards();

            handCards.Cards = new List<Card>();
            handCards.User = user;

            _handCardsProvider.Add(handCards);
        }

        //fix handcards
        private List<Card> DealTwoCards(List<Move> moves, User user, int gameId, int roundId)
        {
            var cardToUser = new List<Card>();
            var handCardsToCache = new List<HandCards>();
            var move = new Move();
            Deck deckFromCache = _deckProvider.Get(gameId);

            cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
            handCardsToCache.Add(new HandCards { Cards = cardToUser, User = user });

            deckFromCache.DiscardPile.AddRange(cardToUser);
            deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);

            move = new Move { RoundId = roundId, UserId = user.Id, CardId = cardToUser[0].Id };
            moves.Add(move);
            move = new Move { RoundId = roundId, UserId = user.Id, CardId = cardToUser[1].Id };
            moves.Add(move);

            return cardToUser;
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
            Game game = await _gameRepository.Get(request.GameId);
            if(game == null)
            {
                throw new NullReferenceException();
            }

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);

            User userToChange = users.FirstOrDefault(item => item.UserRole == UserRole.PeoplePlayer);

            int userCache = request.Cash;
            userToChange.Cash += userCache;

            await _userRepository.Update(userToChange);

            return userToChange.Cash;
        }

        public async Task<List<ResponseGameOverViewModel>> GameOver(int gameId)
        {
            List<ResponseGameOverViewModel> result = await GameOverResponse(gameId);

            return result;
        }

        //fix
        //reduce size
        public async Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request)
        {
            var game = new Game();

            IEnumerable<Card> cards = await _cardRepository.Get();
            if(cards == null)
            {
                throw new NullReferenceException();
            }

            cards = this.Reshuffle(cards.ToList());

            var userGames = new List<UserGames>();
            var bots = new List<User>();

            RequestUserViewModel requestUser = request.User;

            User peoplePlayer = await _userRepository.Get(requestUser.Nickname);
            User dealer = await _userRepository.Get(BusinessLogicConstant._DealerNickname);

            int requestRoundQuantity = request.RoundQuantity;
            game.RoundQuantity = requestRoundQuantity;

            await _gameRepository.Create(game);
            int gameId = game.Id;

            for (int i = 0; i < request.BotQuantity; i++)
            {
                var bot = new User();
                //#1
                bot.Nickname = "Bot#" + (i + 1);
                bot.UserRole = UserRole.BotPlayer;

                bots.Add(bot);

                CreateHandCards(bot);
            }
            await _userRepository.CreateRange(bots);

            if (dealer != null && peoplePlayer != null)
            {
                CreateHandCards(peoplePlayer);
                CreateHandCards(dealer);
            }

            if (dealer == null)
            {
                dealer = new User();
                dealer.Nickname = BusinessLogicConstant._DealerNickname;
                dealer.UserRole = UserRole.Dealer;

                await _userRepository.Create(dealer);

                CreateHandCards(dealer);
            }

            if (peoplePlayer == null)
            {
                peoplePlayer = new User();
                peoplePlayer.Nickname = requestUser.Nickname;
                peoplePlayer.UserRole = UserRole.PeoplePlayer;

                await _userRepository.Create(peoplePlayer);

                CreateHandCards(peoplePlayer);
            }

            foreach(var bot in bots)
            {
                var userGame = new UserGames();
                userGame.GameId = gameId;
                userGame.UserId = bot.Id;

                userGames.Add(userGame);
            }

            var peopleUserGame = new UserGames();
            peopleUserGame.GameId = gameId;
            peopleUserGame.UserId = peoplePlayer.Id;
            peopleUserGame.Rate = request.UserRate;

            userGames.Add(peopleUserGame);

            var dealerUserGame = new UserGames();
            dealerUserGame.GameId = gameId;
            dealerUserGame.UserId = dealer.Id;

            userGames.Add(dealerUserGame);

            await _userGamesRepository.CreateRange(userGames);

            _deckProvider.Add(new Deck { Cards = cards.ToList() }, gameId); 
            await CreateNewRound(gameId);

            ResponseGameViewModel result = await GameResponse(gameId);
            return result;
        }

        public async Task<ResponseGameViewModel> CreateNewRound(int gameId)
        {
            Deck deckFromCache = _deckProvider.Get(gameId);

            List<Card> discardPile = deckFromCache.DiscardPile;
            List<Card> cards = deckFromCache.Cards;

            Game game = await _gameRepository.Get(gameId);

            if (game == null || discardPile == null || cards == null)
            {
                throw new NullReferenceException();
            }

            Round round = new Round { GameId = gameId };
            await _roundRepository.Create(round);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);

            List<HandCards> handCardsFromCache = _handCardsProvider.Get(users);

            var userRounds = new List<UserRound>();

            CheckDeck(deckFromCache, gameId);

            foreach(var user in users)
            {
                int userId = user.Id;
                int roundId = round.Id;

                HandCards handCards = handCardsFromCache.FirstOrDefault(item => item.User.Id == userId);
                int handCardsCount = handCards.Cards.Count;

                discardPile.AddRange(handCards.Cards);
                handCards.Cards.RemoveRange(0, handCardsCount);

                userRounds.Add(new UserRound { RoundId = roundId, UserId = userId });
                _handCardsProvider.Update(handCards);
            }

            deckFromCache.Cards = cards;
            deckFromCache.DiscardPile = discardPile;

            _deckProvider.Update(deckFromCache, gameId);
            await _userRoundRepository.CreateRange(userRounds);
            return await GameResponse(gameId);
        }

        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            ResponseGameViewModel result = await GameResponse(gameId);
            List<ResponseUserViewModel> usersResult = result.Users;


            Deck deckFromCache = _deckProvider.Get(gameId);
            var handCardsToCache = new List<HandCards>();

            var cardToUser = new List<Card>();

            var move = new Move();
            var moves = new List<Move>();

            Game game = await _gameRepository.Get(gameId);

            if (game == null)
            {
                throw new NullReferenceException();
            }

            List<UserGames> userGames = await _userGamesRepository.Get(game);

            UserRound userRound;

            List<User> users = await _userRepository.Get(userGames);
            IEnumerable<User> usersExceptDealer = users.Where(user => user.UserRole != UserRole.Dealer);
            User dealer = users.FirstOrDefault(user => user.UserRole == UserRole.Dealer);

            List<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();
            int lastRoundId = lastRound.Id;

            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(users);
            userRounds = userRounds.Where(item => item.RoundId == lastRoundId);

            for (int i = 0; i < usersExceptDealer.Count(); i++)
            {
                User currentUser = usersExceptDealer.ElementAt(i);

                cardToUser = DealTwoCards(moves, currentUser, gameId, lastRoundId);
                usersResult.FirstOrDefault(item => item.Nickname == currentUser.Nickname).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);

                userRound = userRounds.FirstOrDefault(item => item.UserId == currentUser.Id);
                userRound.Points += cardToUser.Sum(card => card.CardValue);
                await CheckSpecialPoint(moves, userRound);
            }

            await _moveRepository.CreateRange(moves);
            moves.RemoveRange(0, moves.Count);

            cardToUser = DealTwoCards(moves, dealer, gameId, lastRound.Id);
            usersResult.FirstOrDefault(item => item.UserRole == UserRole.Dealer).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);

            await _moveRepository.CreateRange(moves);

            _handCardsProvider.AddRange(handCardsToCache);

            userRound = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);
            userRound.Points += cardToUser.Sum(card => card.CardValue);
            await CheckSpecialPoint(moves, userRound);
            result = await GameResponse(game.Id);

            return result;
        }

        //fix
        public async Task<ResponseGameViewModel> DealCardToPlayer(int gameId)
        {
            Deck deckFromCache = _deckProvider.Get(gameId);
            Card cardToUser = deckFromCache.Cards.Last();
            Game game = await _gameRepository.Get(gameId);

            if (game == null)
            {
                throw new NullReferenceException();
            }

            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();
            var move = new Move();
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            User user = users.FirstOrDefault(item => item.UserRole == UserRole.PeoplePlayer);
            HandCards handCardsFromCache = _handCardsProvider.Get(user);
            UserRound userRound = await _userRoundRepository.Get(user.Id, lastRound.Id);
            ResponseGameViewModel result = await GameResponse(gameId);
            
            if (userRound.RoundStatus != RoundStatus.None || userRound.Points >= BusinessLogicConstant._BlackjackPoint)
            {
                return result;
            }

            if (user != null)
            {
                move = new Move();

                move.UserId = user.Id;
                move.RoundId =lastRound.Id;
                move.CardId = cardToUser.Id;

                handCardsFromCache.Cards.Add(cardToUser);
                _handCardsProvider.Update(handCardsFromCache);

                await _moveRepository.Create(move);

                userRound.Points += cardToUser.CardValue;

                deckFromCache.DiscardPile.Add(cardToUser);
                deckFromCache.Cards.Remove(cardToUser);
            }

            _deckProvider.Update(deckFromCache, gameId);

            await _userRoundRepository.Update(userRound);

            result = await GameResponse(game.Id);
            return result;
        }

        //fix
        public async Task<ResponseGameViewModel> DealCardToDealer(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);
            if (game == null)
            {
                throw new NullReferenceException();
            }

            Deck deckFromCache = _deckProvider.Get(gameId);
            Card cardToUser = deckFromCache.Cards.Last();

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            User dealer = users.FirstOrDefault(item => item.UserRole == UserRole.Dealer);
            HandCards handCardsFromCache = _handCardsProvider.Get(dealer);

            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();

            var move = new Move();
            var movesToCreate = new List<Move>();
            UserRound userRound = await _userRoundRepository.Get(dealer.Id, lastRound.Id);
            List<Move> moves = await _moveRepository.Get(dealer.Id, lastRound.Id);

             ResponseGameViewModel result = await GameResponse(gameId);
            ResponseRoundViewModel resultLastRound = result.Rounds.Last();

            bool takeNextCard = true;

            while (takeNextCard)
            {
                bool isMoreThan17Points = await CheckDealerPoints(moves);
                bool gameIsOver = await CheckGameOver(game);

                result.IsOver = gameIsOver;

                if ((isMoreThan17Points && gameIsOver) || ((userRound.Points >= BusinessLogicConstant._BlackjackPoint) && gameIsOver))
                {
                    await SetRoundStatus(lastRound);

                    await DistributeMoney(gameId);

                    result = await GameResponse(gameId);
                    resultLastRound.IsOver = true;
                    takeNextCard = false;

                    return result;
                }

                if (isMoreThan17Points || (userRound.Points >= BusinessLogicConstant._BlackjackPoint))
                {
                    await SetRoundStatus(lastRound);

                    result = await GameResponse(gameId);
                    resultLastRound.IsOver = true;
                    takeNextCard = false;

                    return result;
                }

                move = new Move { UserId = dealer.Id, RoundId = lastRound.Id, CardId = cardToUser.Id };
                movesToCreate.Add(move);
                moves.Add(move);

                userRound.Points += cardToUser.CardValue;

                handCardsFromCache.Cards.Add(cardToUser);
                _handCardsProvider.Update(handCardsFromCache);
                deckFromCache.DiscardPile.Add(cardToUser);
                deckFromCache.Cards.Remove(cardToUser);
                _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile}, gameId);
            }

            await _moveRepository.CreateRange(movesToCreate);

            await _userRoundRepository.Update(userRound);

            result = await GameResponse(gameId);
            result.IsOver = await CheckGameOver(game);

            return result;
        }

        //fix
        public ResponseGameViewModel DealCardsToBot(RequestDealCardsToBotViewModel request)
        {
            Game game = _gameRepository.Get(request.GameId).GetAwaiter().GetResult();
            if (game == null)
            {
                throw new NullReferenceException();
            }

            Deck deckFromCache = _deckProvider.Get(request.GameId);

            List<UserGames> userGames = _userGamesRepository.Get(game).GetAwaiter().GetResult();
            IEnumerable<User> users = _userRepository.Get(userGames).GetAwaiter().GetResult();

            IEnumerable<Round> rounds = _roundRepository.Get(game).GetAwaiter().GetResult();
            Round lastRound = rounds.Last();

            var move = new Move();

            UserRound userRound = _userRoundRepository.Get(request.UserId, lastRound.Id).GetAwaiter().GetResult();
            User bot = _userRepository.Get(request.UserId).GetAwaiter().GetResult();
            HandCards handCardsFromCache = _handCardsProvider.Get(bot);

            List<Move> moves = _moveRepository.Get(request.UserId, lastRound.Id).GetAwaiter().GetResult();
            var movesToCreate = new List<Move>();

            List<Card> allBotCards = _cardRepository.Get(moves).GetAwaiter().GetResult();

            bool takeNextCard = true;

            if (userRound.RoundStatus != RoundStatus.None || userRound.Points >= BusinessLogicConstant._BlackjackPoint)
            {
                return GameResponse(request.GameId).GetAwaiter().GetResult();
            }

            while (takeNextCard)
            {
                int sumCards = allBotCards.Sum(card => card.CardValue);
                int randomValue = new Random().Next(0, 2);

                Card cardToUser = deckFromCache.Cards.Last();

                if ((sumCards > BusinessLogicConstant._MaxBotsPoints && randomValue == 0) || sumCards >= BusinessLogicConstant._BlackjackCombination)
                {
                    takeNextCard = false;
                    break;
                }

                move = new Move { RoundId = lastRound.Id, UserId = bot.Id, CardId = cardToUser.Id };
                userRound.Points += cardToUser.CardValue;
                allBotCards.Add(cardToUser);
                moves.Add(move);
                movesToCreate.Add(move);

                handCardsFromCache.Cards.Add(cardToUser);
                _handCardsProvider.Update(handCardsFromCache);
                deckFromCache.DiscardPile.Add(cardToUser);
                deckFromCache.Cards.Remove(cardToUser);
            }

            _userRoundRepository.Update(userRound).GetAwaiter().GetResult();
            _moveRepository.CreateRange(movesToCreate).GetAwaiter().GetResult();

            _deckProvider.Update(deckFromCache, request.GameId);
            
            return GameResponse(game.Id).Result;
        }
        #endregion
    }
}