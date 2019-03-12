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

        private void Reshuffle(List<Card> Deck)
        {
            Random rand = new Random();

            for (int i = Deck.Count - 1; i >= 1; i--)
            {
                int j = rand.Next(i + 1);
                
                Card buffer = Deck[j];
                Deck[j] = Deck[i];
                Deck[i] = buffer;
            }
        }
        
        private void CheckDeck(Deck deck, int gameId)
        {
            List<Card> deckCards = deck.Cards;
            List<Card> deckDiscardPile = deck.DiscardPile;

            int deckCardsCount = deckCards.Count;
            int deckDiscardPileCount = deck.DiscardPile.Count;

            if (deckCardsCount < BusinessLogicConstant._MinDeckSize)
            {
                deckCards.AddRange(deckDiscardPile);
                deckDiscardPile.RemoveRange(0, deckDiscardPileCount);
                Reshuffle(deckCards);

                var deckToUpdate = new Deck();
                deckToUpdate.Cards = deckCards;
                deckToUpdate.DiscardPile = deckDiscardPile;

                _deckProvider.Update(deckToUpdate, gameId);
            }
        }

        private bool CheckBlackJackPoint(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            List<Card> cards = handCards.Cards;

            bool isBlackJackPoint = false;

            int cardsSum = cards.Sum(card => card.CardValue);

            if (cardsSum == BusinessLogicConstant._BlackjackCombination)
            {
                isBlackJackPoint = true;
                return isBlackJackPoint;
            }

            return isBlackJackPoint;
        }

        private bool CheckBustedCards(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            List<Card> cards = handCards.Cards;

            bool isBust = false;

            int cardsSum = cards.Sum(card => card.CardValue);

            if (cardsSum > BusinessLogicConstant._BlackjackCombination)
            {
                isBust = true;
                return isBust;
            }

            return isBust;
        }

        private bool CheckDealerPoints(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            List<Card> cards = handCards.Cards;

            int cardsSum = cards.Sum(card => card.CardValue);

            bool isMoreThan17Points = false;

            if (cardsSum > BusinessLogicConstant._MaxDealerPoints)
            {
                isMoreThan17Points = true;
                return isMoreThan17Points;
            }

            return isMoreThan17Points;
        }
 
        private bool CheckGoldenPoint(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            IEnumerable<Card> cards = handCards.Cards;

            bool isGoldenPoint = true;

            foreach (var card in cards)
            {
                if(card.CardName != CardNameType.Ace)
                {
                    isGoldenPoint = false;
                }
            }

            return isGoldenPoint;
        }

        private async Task CheckSpecialPoint(User user, UserRound userRound)
        {
            bool isBlackJack = CheckBlackJackPoint(user);
            bool isGoldenPoint = CheckGoldenPoint(user);

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

        private async Task<List<ResponseGameOverViewModel>> GameOverResponse(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);
            List<Round> rounds = await _roundRepository.Get(game);
            List<UserRound> userRounds = await _userRoundRepository.Get(rounds);

            List<ResponseGameOverViewModel> result = new List<ResponseGameOverViewModel>();

            int winsQuantity = 0;

            foreach (User user in users)
            {
                if (user.UserRole == UserRoleType.Dealer)
                {
                    continue;
                }

                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.UserId == user.Id);
                IEnumerable<UserRound> wins = currentUserRounds.Where(x => x.RoundStatus == RoundStatusType.Winner);

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

        private async Task<ResponseGameViewModel> GameResponse(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);
            List<Round> rounds = await _roundRepository.Get(game);

            var result = new ResponseGameViewModel();

            result.Id = gameId;
            result.Rounds = _mapper.Map<List<ResponseRoundViewModel>>(rounds);
            result.Users = _mapper.Map<List<ResponseUserViewModel>>(users);
            result.UserGames = _mapper.Map<List<ResponseUserGameViewModel>>(userGames);
            result.IsOver = await CheckGameOver(game);

            await SetRoundsToViewModel(result.Rounds, rounds);

            List<ResponseRoundViewModel> roundResult = result.Rounds;
            ResponseRoundViewModel resultRoundsLast = roundResult.Last();

            await SetUserCardToViewModels(result.Users);

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

            User dealer = users.FirstOrDefault(user => user.UserRole == UserRoleType.Dealer);
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
                    currentUserRound.RoundStatus = RoundStatusType.Standoff;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if((userRoundDealer.Points > currentUserRound.Points) && bothIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatusType.Winner;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if((userRoundDealer.Points < currentUserRound.Points) && bothIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatusType.Looser;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(playerIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatusType.Looser;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(dealerIsBusted)
                {
                    currentUserRound.RoundStatus = RoundStatusType.Winner;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(currentUserRound.Points > userRoundDealer.Points)
                {
                    currentUserRound.RoundStatus = RoundStatusType.Winner;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
                if(currentUserRound.Points < userRoundDealer.Points)
                {
                    currentUserRound.RoundStatus = RoundStatusType.Looser;
                    userRoundsToUpdate.Add(currentUserRound);
                    continue;
                }
            }

            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
        }

        private async Task SetUserCardToViewModels(List<ResponseUserViewModel> responses)
        {
            List<int> userIds = responses.Select(x => x.Id).ToList();
            IEnumerable<User> users = await _userRepository.Get(userIds);

            List<HandCards> handCards = _handCardsProvider.Get(users);

            foreach (var user in responses)
            {
                HandCards currentHand = handCards.FirstOrDefault(item => item.User.Id == user.Id);
                List<Card> currentCards = currentHand.Cards;

                user.Cards = _mapper.Map<List<ResponseCardViewModel>>(currentCards);
            }
        }

        private async Task SetRoundsToViewModel(List<ResponseRoundViewModel> responseRounds, List<Round> rounds)
        {
            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(rounds);

            List<int> userIds = userRounds.Select(item => (int)item.UserId).ToList();
            List<User> users = await _userRepository.Get(userIds);

            foreach(var responseRound in responseRounds)
            {
                Round round = rounds.FirstOrDefault(item => item.Id == responseRound.RoundId);
                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.RoundId == round.Id);

                responseRound.UserRound = _mapper.Map<List<ResponseUserRoundViewModel>>(currentUserRounds);
                SetNicknameToUserRoundsViewModel(responseRound.UserRound, users);
            }
        }

        private void SetNicknameToUserRoundsViewModel(List<ResponseUserRoundViewModel> userRounds, List<User> users)
        {
            for(int i = 0; i < userRounds.Count; i++)
            {
                int currentUserId = userRounds[i].UserId;
                User currentUser = users.FirstOrDefault(item => item.Id == currentUserId);
                string currentUserNickname = currentUser.Nickname;

                userRounds[i].Nickname = currentUserNickname;
            }
        }

        private void CreateHandCards(User user)
        {
            var handCards = new HandCards();

            handCards.Cards = new List<Card>();
            handCards.User = user;

            _handCardsProvider.Add(handCards);
        }

        private List<Card> DealTwoCards(DealTwoCardsDTO request)
        {
            var cardToUser = new List<Card>();

            HandCards userHand = _handCardsProvider.Get(request.User);
            Deck deckFromCache = _deckProvider.Get(request.GameId);

            var move = new Move();

            cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
            userHand.Cards.AddRange(cardToUser);

            deckFromCache.DiscardPile.AddRange(cardToUser);
            deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);

            for(int i = 0; i < cardToUser.Count; i++)
            {
                move = new Move { RoundId = request.RoundId, UserId = request.User.Id, CardId = cardToUser[i].Id };
                request.Moves.Add(move);
            }

            _handCardsProvider.Update(userHand);
            _deckProvider.Update(deckFromCache, request.GameId);

            return cardToUser;
        }

        private void UpdateCache(UpdateCacheDTO request)
        {
            HandCards requestHand = request.HandCards;

            Card requestCard = request.Card;

            Deck requestDeck = request.Deck;
            List<Card> cards = requestDeck.Cards;
            List<Card> discardPile = requestDeck.DiscardPile;

            int gameId = request.GameId;

            cards.Add(requestCard);
            _handCardsProvider.Update(requestHand);

            discardPile.Add(requestCard);
            cards.Remove(requestCard);
            _deckProvider.Update(requestDeck, gameId);
        }

        private List<Move> DealCardsToBot(DealCardsToBotDTO request)
        {
            int gameId = request.GameId;

            Deck deckFromCache = _deckProvider.Get(gameId);

            HandCards handCardsFromCache = _handCardsProvider.Get(request.Bot);

            UserRound requestUserRound = request.UserRound;
            List<Card> requestCards = request.Cards;
            List<UserRound> requestUserRoundsToUpdate = request.UserRoundsToUpdate;
            User requestBot = request.Bot;

            bool takeNextCard = true;

            var move = new Move();
            var moves = new List<Move>();

            bool userRoundIsChange = false;

            if (requestUserRound.RoundStatus != RoundStatusType.None || requestUserRound.Points >= BusinessLogicConstant._BlackjackPoint)
            {
                return moves;
            }

            while (takeNextCard)
            {
                int sumCards = request.Cards.Sum(card => card.CardValue);
                int randomValue = new Random().Next(0, 2);

                Card cardToUser = deckFromCache.Cards.Last();

                if ((sumCards > BusinessLogicConstant._MaxBotsPoints && randomValue == 0) || sumCards >= BusinessLogicConstant._BlackjackCombination)
                {
                    takeNextCard = false;
                    break;
                }

                move = new Move { RoundId = requestUserRound.RoundId, UserId = requestBot.Id, CardId = cardToUser.Id };

                requestUserRound.Points += cardToUser.CardValue;
                requestCards.Add(cardToUser);

                moves.Add(move);

                userRoundIsChange = true;

                var updateRequest = new UpdateCacheDTO { Card = cardToUser, Deck = deckFromCache, GameId = gameId, HandCards = handCardsFromCache };
                UpdateCache(updateRequest);
            }

            if (userRoundIsChange)
            {
                requestUserRoundsToUpdate.Add(requestUserRound);
            }

            return moves;
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
            User user = await _userRepository.Get(request.UserId);

            int userCache = request.Cash;
            user.Cash += userCache;

            await _userRepository.Update(user);

            return user.Cash;
        }

        public async Task<List<ResponseGameOverViewModel>> GameOver(int gameId)
        {
            List<ResponseGameOverViewModel> result = await GameOverResponse(gameId);

            return result;
        }

        //reduce size
        public async Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request)
        {
            var game = new Game();

            IEnumerable<Card> cards = await _cardRepository.Get();

            Reshuffle(cards.ToList());

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
                bot.Nickname = $"Bot#{i+1}";
                bot.UserRole = UserRoleType.BotPlayer;

                bots.Add(bot);

                CreateHandCards(bot);
            }
            await _userRepository.CreateRange(bots);

            if (dealer != null && peoplePlayer != null)
            {
                CreateHandCards(peoplePlayer);
                CreateHandCards(dealer);
            }

            if (peoplePlayer == null)
            {
                peoplePlayer = new User();
                peoplePlayer.Nickname = requestUser.Nickname;
                peoplePlayer.UserRole = UserRoleType.PeoplePlayer;

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

            Game game = await _gameRepository.Get(gameId);

            Round round = new Round { GameId = gameId };
            await _roundRepository.Create(round);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);

            List<HandCards> handCardsFromCache = _handCardsProvider.Get(users);

            var userRounds = new List<UserRound>();

            CheckDeck(deckFromCache, gameId);

            foreach(var user in users)
            {
                int userId = user.Id;
                int roundId = round.Id;

                HandCards userHand = handCardsFromCache.FirstOrDefault(item => item.User.Id == userId);
                List<Card> userHandCards = userHand.Cards;
                int handCardsCount = userHandCards.Count;

                userHandCards.RemoveRange(0, handCardsCount);

                userRounds.Add(new UserRound { RoundId = roundId, UserId = userId });
                _handCardsProvider.Update(userHand);
            }
            
            await _userRoundRepository.CreateRange(userRounds);
            return await GameResponse(gameId);
        }

        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            ResponseGameViewModel result = await GameResponse(gameId);
            List<ResponseUserViewModel> usersResult = result.Users;

            var dealTwoCardsRequest = new DealTwoCardsDTO();

            var cardToUser = new List<Card>();

            var move = new Move();
            var moves = new List<Move>();

            Game game = await _gameRepository.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);

            UserRound userRound;

            IEnumerable<User> usersExceptDealer = users.Where(user => user.UserRole != UserRoleType.Dealer);
            User dealer = users.FirstOrDefault(user => user.UserRole == UserRoleType.Dealer);

            List<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();
            int lastRoundId = lastRound.Id;

            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(users);
            userRounds = userRounds.Where(item => item.RoundId == lastRoundId);

            for (int i = 0; i < usersExceptDealer.Count(); i++)
            {
                User currentUser = usersExceptDealer.ElementAt(i);

                dealTwoCardsRequest = new DealTwoCardsDTO { GameId = gameId, Moves = moves, RoundId = lastRoundId, User = currentUser };

                cardToUser = DealTwoCards(dealTwoCardsRequest);
                usersResult.FirstOrDefault(item => item.Nickname == currentUser.Nickname).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);

                userRound = userRounds.FirstOrDefault(item => item.UserId == currentUser.Id);
                userRound.Points += cardToUser.Sum(card => card.CardValue);
                await CheckSpecialPoint(currentUser, userRound);
            }

            await _moveRepository.CreateRange(moves);
            moves.RemoveRange(0, moves.Count);

            dealTwoCardsRequest.User = dealer;

            cardToUser = DealTwoCards(dealTwoCardsRequest);
            usersResult.FirstOrDefault(item => item.UserRole == UserRoleType.Dealer).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);

            await _moveRepository.CreateRange(moves);

            userRound = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);
            userRound.Points += cardToUser.Sum(card => card.CardValue);
            await CheckSpecialPoint(dealer, userRound);
            result = await GameResponse(game.Id);

            return result;
        }

        public async Task<ResponseGameViewModel> DealCardToPlayer(int gameId)
        {
            Deck deckFromCache = _deckProvider.Get(gameId);
            Card cardToUser = deckFromCache.Cards.Last();

            Game game = await _gameRepository.Get(gameId);
            IEnumerable<Round> rounds = await _roundRepository.Get(game);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            User user = users.FirstOrDefault(item => item.UserRole == UserRoleType.PeoplePlayer);
            HandCards handCardsFromCache = _handCardsProvider.Get(user);

            Round lastRound = rounds.Last();
            UserRound userRound = await _userRoundRepository.Get(user.Id, lastRound.Id);

            var move = new Move();

            ResponseGameViewModel result = await GameResponse(gameId);
            
            if (userRound.RoundStatus != RoundStatusType.None || userRound.Points >= BusinessLogicConstant._BlackjackPoint)
            {
                return result;
            }

            move = new Move();
            move.UserId = user.Id;
            move.RoundId = lastRound.Id;
            move.CardId = cardToUser.Id;

            await _moveRepository.Create(move);

            userRound.Points += cardToUser.CardValue;

            var updateRequest = new UpdateCacheDTO { Card = cardToUser, Deck = deckFromCache, GameId = gameId, HandCards = handCardsFromCache };
            UpdateCache(updateRequest);

            await _userRoundRepository.Update(userRound);

            result = await GameResponse(game.Id);

            return result;
        }

        //reduce size
        public async Task<ResponseGameViewModel> DealCardToDealer(int gameId)
        {
            Deck deckFromCache = _deckProvider.Get(gameId);
            List<Card> deckFromCacheCards = deckFromCache.Cards;
            List<Card> deckFromCacheDiscardPile = deckFromCache.DiscardPile;

            Game game = await _gameRepository.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            User dealer = users.FirstOrDefault(item => item.UserRole == UserRoleType.Dealer);
            HandCards handCardsFromCache = _handCardsProvider.Get(dealer);
            int dealerId = dealer.Id;

            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();
            int lastRoundId = lastRound.Id;

            var move = new Move();
            var movesToCreate = new List<Move>();

            UserRound userRound = await _userRoundRepository.Get(dealerId, lastRoundId);

            List<Move> moves = await _moveRepository.Get(dealerId, lastRoundId);

            ResponseGameViewModel result = await GameResponse(gameId);
            ResponseRoundViewModel resultLastRound = result.Rounds.Last();

            bool takeNextCard = true;

            while (takeNextCard)
            {
                Card cardToUser = deckFromCacheCards.Last();

                bool isMoreThan17Points = CheckDealerPoints(dealer);
                bool gameIsOver = await CheckGameOver(game);

                result.IsOver = gameIsOver;

                if ((isMoreThan17Points && gameIsOver) || ((userRound.Points >= BusinessLogicConstant._BlackjackPoint) && gameIsOver))
                {
                    await SetRoundStatus(lastRound);
                    await DistributeMoney(gameId);

                    if(movesToCreate.Count != 0)
                    {
                        await _moveRepository.CreateRange(movesToCreate);
                    }

                    result = await GameResponse(gameId);
                    resultLastRound.IsOver = true;
                    takeNextCard = false;

                    return result;
                }

                if (isMoreThan17Points || (userRound.Points >= BusinessLogicConstant._BlackjackPoint))
                {
                    await SetRoundStatus(lastRound);
                    if (movesToCreate.Count != 0)
                    {
                        await _moveRepository.CreateRange(movesToCreate);
                    }

                    result = await GameResponse(gameId);
                    resultLastRound.IsOver = true;
                    takeNextCard = false;

                    return result;
                }

                move = new Move { UserId = dealerId, RoundId = lastRoundId, CardId = cardToUser.Id };
                movesToCreate.Add(move);
                moves.Add(move);

                userRound.Points += cardToUser.CardValue;

                var updateRequest = new UpdateCacheDTO { Card = cardToUser, Deck = deckFromCache, GameId = gameId, HandCards = handCardsFromCache };
                UpdateCache(updateRequest);
            }

            await _moveRepository.CreateRange(movesToCreate);

            await _userRoundRepository.Update(userRound);

            result = await GameResponse(gameId);
            result.IsOver = await CheckGameOver(game);

            return result;
        }

        public async Task<ResponseGameViewModel> DealCardsToAllBots(int gameId) 
        {
            ResponseGameViewModel response = new ResponseGameViewModel();

            Game game = await _gameRepository.Get(gameId);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            IEnumerable<User> bots = users.Where(user => user.UserRole == UserRoleType.BotPlayer);

            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();

            List<UserRound> botsUserRounds = await _userRoundRepository.Get(bots, lastRound.Id);

            List<Move> moves = await _moveRepository.Get(bots, lastRound.Id);
            var movesToCreate = new List<Move>();
            var userRoundsToUpdate = new List<UserRound>();

            List<Card> allBotCards = await _cardRepository.Get(moves);

            for(int i = 0; i < bots.Count(); i++)
            {
                User currentBot = bots.ElementAt(i);
                IEnumerable<Move> movesOnTheCurrentBot = moves.Where(move => move.UserId == currentBot.Id);
                List<Card> cardsOnTheCurrentBot = allBotCards.Where(card => movesOnTheCurrentBot.Select(move => move.CardId).Contains(card.Id)).ToList();

                UserRound userRoundOnTheCurrentBot = botsUserRounds.FirstOrDefault(item => item.UserId == currentBot.Id);

                var dealCardsRequest = new DealCardsToBotDTO();

                dealCardsRequest.GameId = gameId;
                dealCardsRequest.Bot = currentBot;
                dealCardsRequest.Cards = cardsOnTheCurrentBot;
                dealCardsRequest.UserRoundsToUpdate = userRoundsToUpdate;
                dealCardsRequest.UserRound = userRoundOnTheCurrentBot;

                List<Move> newMoves = DealCardsToBot(dealCardsRequest);

                movesToCreate.AddRange(newMoves);
            }
            

            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
            await _moveRepository.CreateRange(movesToCreate);

            return await GameResponse(game.Id);
        }
        #endregion
    }
}