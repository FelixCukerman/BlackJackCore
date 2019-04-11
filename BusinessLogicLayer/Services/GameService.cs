using System;
using System.Collections.Generic;
using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using DataAccessLayer.Interfaces;
using BusinessLogicLayer.DTOs;
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
using BusinessLogicLayer.Models.RequestModels.GameRequestModels;

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
        private IDeckProvider _deckProvider;
        private IHandCardsProvider _handCardsProvider;
        #endregion

        #region Constructors
        public GameService(IGameRepository gameRepository, ICardRepository cardRepository, IRoundRepository roundRepository, IMoveRepository moveRepository, IUserGamesRepository userGamesRepository, IUserRepository userRepository, IUserRoundRepository userRoundRepository, IMapper mapper, IHandCardsProvider handCardsProvider, IDeckProvider deckProvider)
        {
            _gameRepository = gameRepository;
            _cardRepository = cardRepository;
            _roundRepository = roundRepository;
            _moveRepository = moveRepository;
            _userGamesRepository = userGamesRepository;
            _userRepository = userRepository;
            _userRoundRepository = userRoundRepository;
            _mapper = mapper;
            _deckProvider = deckProvider;
            _handCardsProvider = handCardsProvider;
        }
        #endregion

        #region Private Methods
        private void Reshuffle(List<Card> Deck)
        {
            var random = new Random();

            for (int i = Deck.Count - 1; i >= 1; i--)
            {
                int randomIndex = random.Next(i + 1);
                
                Card buffer = Deck[randomIndex];
                Deck[randomIndex] = Deck[i];
                Deck[i] = buffer;
            }
        }
        
        private void CheckDeck(Deck deck, int gameId)
        {
            List<Card> deckCards = deck.Cards;
            List<Card> deckDiscardPile = deck.DiscardPile;

            int deckCardsCount = deckCards.Count;
            int deckDiscardPileCount = deckDiscardPile.Count;

            if (deckCardsCount > BusinessLogicConstant.MinDeckSize)
            {
                return;
            }

            deckCards.AddRange(deckDiscardPile);
            deckDiscardPile.RemoveRange(BusinessLogicConstant.StartPosition, deckDiscardPileCount);
            Reshuffle(deckCards);

            var deckToUpdate = new Deck();
            deckToUpdate.Cards = deckCards;
            deckToUpdate.DiscardPile = deckDiscardPile;

            _deckProvider.Update(deckToUpdate, gameId);
        }

        private bool CheckBlackJackPoint(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            List<Card> cards = handCards.Cards;

            int cardsSum = cards.Sum(card => card.CardValue);

            bool isBlackJackPoint = cardsSum == BusinessLogicConstant.BlackjackCombination;

            return isBlackJackPoint;
        }

        private bool CheckBlackJackPointAtTheStart(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            List<Card> cards = handCards.Cards;

            int cardsSum = cards.Sum(card => card.CardValue);

            bool isBlackJackPoint = cardsSum == BusinessLogicConstant.BlackjackCombination && cards.Count == BusinessLogicConstant.CardsCountAtTheStart;

            return isBlackJackPoint;
        }

        private bool CheckBustedCards(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            List<Card> cards = handCards.Cards;

            int cardsSum = cards.Sum(card => card.CardValue);

            bool isBust = cardsSum > BusinessLogicConstant.BlackjackCombination;

            return isBust;
        }

        private bool CheckDealerPoints(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            List<Card> cards = handCards.Cards;

            int cardsSum = cards.Sum(card => card.CardValue);

            bool isMoreThan17Points = cardsSum > BusinessLogicConstant.RestrictionDealerPoints;

            return isMoreThan17Points;
        }
 
        private bool CheckGoldenPoint(User user)
        {
            HandCards handCards = _handCardsProvider.Get(user);
            IEnumerable<Card> cards = handCards.Cards;

            bool isStartCombination = cards.Count() == BusinessLogicConstant.CardsCountAtTheStart;

            bool isGoldenPoint = cards.All(card => card.CardName == CardNameType.Ace) && isStartCombination;

            return isGoldenPoint;
        }

        private CardCombinationType GetCardCombination(User user)
        {
            if(CheckBlackJackPointAtTheStart(user))
            {
                return CardCombinationType.BlackJackAtTheStart;
            }

            if(CheckBustedCards(user))
            {
                return CardCombinationType.Bust;
            }

            if(CheckGoldenPoint(user))
            {
                return CardCombinationType.GoldenPoint;
            }

            return CardCombinationType.Shortfall;
        }

        private async Task<bool> CheckGameOver(Game game)
        {
            IEnumerable<Round> rounds = await _roundRepository.Get(game);

            bool gameIsOver = game.RoundQuantity == rounds.Count();

            return gameIsOver;
        }

        private async Task<List<ResponseGameOverViewModel>> GameOverResponse(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);

            IEnumerable<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(rounds);

            var result = new List<ResponseGameOverViewModel>();

            int winsQuantity = default(int);

            foreach (User user in users)
            {
                if (user.UserRole == UserRoleType.Dealer)
                {
                    continue;
                }

                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.UserId == user.Id);
                IEnumerable<UserRound> winningRounds = currentUserRounds.Where(x => x.RoundStatus == RoundStatusType.Winner);

                winsQuantity = winningRounds?.Count() ?? BusinessLogicConstant.ImpeccableLose;

                var itemToResult = new ResponseGameOverViewModel();
                itemToResult.UserId = user.Id;
                itemToResult.Username = user.UserName;
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

            IEnumerable<int> loosersIds = loosers.Select(statistic => statistic.UserId);
            IEnumerable<int> winnersIds = winners.Select(statistic => statistic.UserId);

            List<User> usersToUpdate = new List<User>();

            foreach(ResponseGameOverViewModel userStatistic in gameStatistic)
            {
                int userStatisticUserId = userStatistic.UserId;

                User currentPlayer = users.FirstOrDefault(item => item.Id == userStatisticUserId);
                UserGames currentUserGame = userGames.FirstOrDefault(item => item.UserId == currentPlayer.Id);
                int currentGameRate = currentUserGame.Rate;

                if (loosersIds.Contains(userStatisticUserId))
                {
                    currentPlayer.Cash -= currentGameRate;
                    usersToUpdate.Add(currentPlayer);
                    continue;
                }

                if (winnersIds.Contains(userStatisticUserId))
                {
                    currentPlayer.Cash += currentUserGame.Rate;
                    usersToUpdate.Add(currentPlayer);
                    continue;
                }
            }

            await _userRepository.UpdateRange(usersToUpdate); 
        }

        private async Task SetRoundStatus(Round round)
        {
            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(round);
            IEnumerable<UserGames> userGames = await _userGamesRepository.Get(round);
            IEnumerable<User> users = await _userRepository.Get(userGames);

            User dealer = users.FirstOrDefault(user => user.UserRole == UserRoleType.Dealer);
            IEnumerable<UserRound> userRoundsExceptDealer = userRounds.Where(item => item.UserId != dealer.Id);

            UserRound dealerRound = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);
            dealerRound.CardCombination = GetCardCombination(dealer);

            var userRoundsToUpdate = new List<UserRound>();

            bool dealerHasBlackjackAtTheStart = dealerRound.CardCombination == CardCombinationType.BlackJackAtTheStart;

            foreach (UserRound userRound in userRoundsExceptDealer)
            {
                User currentUser = users.FirstOrDefault(user => user.Id == userRound.UserId);
                userRound.CardCombination = GetCardCombination(currentUser);

                bool playerHasBlackjackAtTheStart = (userRound.CardCombination == CardCombinationType.BlackJackAtTheStart) && !dealerHasBlackjackAtTheStart;
                bool bothIsBusted = (userRound.CardCombination == CardCombinationType.Bust) && (dealerRound.CardCombination == CardCombinationType.Bust);
                bool bothIsShortfall = (userRound.CardCombination == CardCombinationType.Shortfall) && (dealerRound.CardCombination == CardCombinationType.Shortfall);

                if (playerHasBlackjackAtTheStart && !dealerHasBlackjackAtTheStart)
                {
                    userRound.RoundStatus = RoundStatusType.Winner;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if (dealerHasBlackjackAtTheStart && !playerHasBlackjackAtTheStart)
                {
                    userRound.RoundStatus = RoundStatusType.Looser;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if (dealerRound.Points == userRound.Points)
                {
                    userRound.RoundStatus = RoundStatusType.Standoff;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if (userRound.CardCombination == CardCombinationType.GoldenPoint)
                {
                    userRound.RoundStatus = RoundStatusType.Winner;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if ((dealerRound.Points > userRound.Points) && bothIsBusted)
                {
                    userRound.RoundStatus = RoundStatusType.Winner;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if((dealerRound.Points < userRound.Points) && bothIsBusted)
                {
                    userRound.RoundStatus = RoundStatusType.Looser;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if(userRound.CardCombination == CardCombinationType.Bust)
                {
                    userRound.RoundStatus = RoundStatusType.Looser;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if(dealerRound.CardCombination == CardCombinationType.Bust)
                {
                    userRound.RoundStatus = RoundStatusType.Winner; 
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if((userRound.Points > dealerRound.Points) && bothIsShortfall)
                {
                    userRound.RoundStatus = RoundStatusType.Winner;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
                if((userRound.Points < dealerRound.Points) && bothIsShortfall)
                {
                    userRound.RoundStatus = RoundStatusType.Looser;
                    userRoundsToUpdate.Add(userRound);
                    continue;
                }
            }

            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
        }

        private async Task SetUserCardToViewModels(List<ResponseUserViewModel> responses)
        {
            IEnumerable<int> userIds = responses.Select(x => x.Id).ToList();
            List<User> users = await _userRepository.Get(userIds);

            List<HandCards> handCards = _handCardsProvider.Get(users);

            foreach (ResponseUserViewModel user in responses)
            {
                HandCards currentHand = handCards.FirstOrDefault(item => item.User.Id == user.Id);
                List<Card> currentCards = currentHand.Cards;

                user.Cards = _mapper.Map<List<ResponseCardViewModel>>(currentCards);
            }
        }

        private async Task SetRoundsToViewModel(List<ResponseRoundViewModel> responseRounds, List<Round> rounds)
        {
            List<UserRound> userRounds = await _userRoundRepository.Get(rounds);

            IEnumerable<int> userIds = userRounds.Select(item => (int)item.UserId).Distinct();
            List<User> users = await _userRepository.Get(userIds);

            foreach(ResponseRoundViewModel responseRound in responseRounds)
            {
                Round round = rounds.FirstOrDefault(item => item.Id == responseRound.RoundId);
                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.RoundId == round.Id);

                responseRound.UserRound = _mapper.Map<List<ResponseUserRoundViewModel>>(currentUserRounds);
                SetNicknameToUserRoundsViewModel(responseRound.UserRound, users);
            }
        }

        private void SetNicknameToUserRoundsViewModel(List<ResponseUserRoundViewModel> userRounds, List<User> users)
        {
            foreach(ResponseUserRoundViewModel userRound in userRounds)
            {
                int currentUserId = userRound.UserId;
                User currentUser = users.FirstOrDefault(item => item.Id == currentUserId);

                string currentUsername = currentUser.UserName;
                userRound.Nickname = currentUsername;
            }
        }

        private void CreateHandCards(User user)
        {
            var handCards = new HandCards();

            handCards.Cards = new List<Card>();
            handCards.User = user;

            _handCardsProvider.Add(handCards);
        }

        private void DealTwoCards(RequestDealTwoCardsModel request)
        {
            HandCards userHand = _handCardsProvider.Get(request.User);
            Deck deckFromCache = _deckProvider.Get(request.GameId);

            User requestUser = request.User;

            IEnumerable<Card> cardsToUser = deckFromCache.Cards.Take(BusinessLogicConstant.CardsCountAtTheStart);
            IEnumerable<int> cardsIds = cardsToUser.Select(card => card.Id);
            userHand.Cards.AddRange(cardsToUser);

            deckFromCache.DiscardPile.AddRange(cardsToUser);
            deckFromCache.Cards.RemoveAll(card => cardsIds.Contains(card.Id));

            foreach(Card card in cardsToUser)
            {
                var move = new Move();
                move.RoundId = request.RoundId;
                move.UserId = requestUser.Id;
                move.CardId = card.Id;

                request.Moves.Add(move);
            }

            _handCardsProvider.Update(userHand);
            _deckProvider.Update(deckFromCache, request.GameId);
        }

        private void UpdateCache(RequestUpdateCacheModel request)
        {
            HandCards requestHand = request.HandCards;

            Card requestCard = request.Card;

            Deck requestDeck = request.Deck;
            List<Card> cards = requestDeck.Cards;
            List<Card> discardPile = requestDeck.DiscardPile;

            int gameId = request.GameId;

            requestHand.Cards.Add(requestCard);
            _handCardsProvider.Update(requestHand);

            discardPile.Add(requestCard);
            cards.Remove(requestCard);
            _deckProvider.Update(requestDeck, gameId);
        }

        private List<Move> DealCardsToBot(RequestDealCardsToBotModel request)
        {
            int gameId = request.GameId;

            Deck deckFromCache = _deckProvider.Get(gameId);

            HandCards handCardsFromCache = _handCardsProvider.Get(request.Bot);

            UserRound requestUserRound = request.UserRound;
            List<Card> requestCards = request.Cards;
            List<UserRound> requestUserRoundsToUpdate = request.UserRoundsToUpdate;
            User requestBot = request.Bot;

            bool takeNextCard = true;

            var moves = new List<Move>();

            bool userRoundIsChange = false;
             
            if (requestUserRound.RoundStatus != RoundStatusType.None)
            {
                return moves;
            }

            while (takeNextCard)
            {
                int sumCards = request.Cards.Sum(card => card.CardValue);
                int randomValue = new Random().Next(BusinessLogicConstant.RandomRangeLeftBorder, BusinessLogicConstant.RandomRangeRightBorder);

                Card cardToUser = deckFromCache.Cards.Last();

                bool decidedToSkipMove = sumCards > BusinessLogicConstant.RestrictionBotsPoints && randomValue == BusinessLogicConstant.RandomRangeLeftBorder;

                if (decidedToSkipMove || sumCards >= BusinessLogicConstant.BlackjackCombination)
                {
                    takeNextCard = false;
                    break;
                }

                var move = new Move();
                move.RoundId = requestUserRound.RoundId;
                move.UserId = requestBot.Id;
                move.CardId = cardToUser.Id;

                moves.Add(move);

                requestUserRound.Points += cardToUser.CardValue;
                requestCards.Add(cardToUser);

                userRoundIsChange = true;

                var updateRequest = new RequestUpdateCacheModel();
                updateRequest.Card = cardToUser;
                updateRequest.Deck = deckFromCache;
                updateRequest.GameId = gameId;
                updateRequest.HandCards = handCardsFromCache;

                UpdateCache(updateRequest);
            }

            if (userRoundIsChange)
            {
                requestUserRoundsToUpdate.Add(requestUserRound);
            }

            return moves;
        }

        private async Task<ResponseGameViewModel> FinishRound(RequestFinishRoundModel request)
        {
            Round lastRound = request.LastRound;
            List<Move> movesToCreate = request.MovesToCreate;
            ResponseGameViewModel result = request.GameResult;

            int gameId = (int)lastRound.GameId;

            List<ResponseRoundViewModel> resultRounds = result.Rounds;
            ResponseRoundViewModel resultLastRound = resultRounds.Last();

            await SetRoundStatus(lastRound);

            if (movesToCreate.Any())
            {
                await _moveRepository.CreateRange(movesToCreate);
            }

            result = await GameResponse(gameId);
            resultLastRound.IsOver = true;
             
            return result;
        }
        #endregion

        #region Public Methods
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

        public async Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request)
        {
            List<Card> cards = (await _cardRepository.Get()).ToList();
            Reshuffle(cards);

            var userGames = new List<UserGames>();

            List<User> bots = await _userRepository.GetBotsByQuantity(request.BotQuantity);

            User dealer = await _userRepository.Get(BusinessLogicConstant.DealerNickname);

            var game = new Game();

            int requestRoundQuantity = request.RoundQuantity;
            game.RoundQuantity = requestRoundQuantity;

            await _gameRepository.Create(game);
            int gameId = game.Id;

            RequestUserViewModel requestUser = request.User;
            User person = await _userRepository.Get(requestUser.Nickname);

            foreach (User bot in bots)
            {
                CreateHandCards(bot);

                var userGame = new UserGames();
                userGame.GameId = gameId;
                userGame.UserId = bot.Id;

                userGames.Add(userGame);
            }

            CreateHandCards(person);
            CreateHandCards(dealer);

            var peopleGame = new UserGames();
            peopleGame.GameId = gameId;
            peopleGame.UserId = person.Id;
            peopleGame.Rate = request.UserRate;

            userGames.Add(peopleGame);

            var dealerGame = new UserGames();
            dealerGame.GameId = gameId;
            dealerGame.UserId = dealer.Id;

            userGames.Add(dealerGame);

            await _userGamesRepository.CreateRange(userGames);

            Deck deck = new Deck { Cards = cards };
            _deckProvider.Add(deck, gameId); 

            await CreateNewRound(gameId);

            ResponseGameViewModel result = await GameResponse(gameId);

            return result;
        }

        public async Task<ResponseGameViewModel> CreateNewRound(int gameId)
        {
            Round round = new Round { GameId = gameId };
            await _roundRepository.Create(round);

            Game game = await _gameRepository.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            List<HandCards> handCardsFromCache = _handCardsProvider.Get(users);

            var userRounds = new List<UserRound>();

            Deck deckFromCache = _deckProvider.Get(gameId);
            CheckDeck(deckFromCache, gameId);

            foreach(User user in users)
            {
                int userId = user.Id;
                int roundId = round.Id;

                HandCards userHand = handCardsFromCache.FirstOrDefault(item => item.User.Id == userId);
                List<Card> userHandCards = userHand.Cards;
                int handCardsCount = userHandCards.Count;

                userHandCards.RemoveRange(BusinessLogicConstant.StartPosition, handCardsCount);

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

            IEnumerable<Card> cardToUser = null;

            var moves = new List<Move>();

            Game game = await _gameRepository.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);

            UserRound userRound = new UserRound();

            IEnumerable<User> usersExceptDealer = users.Where(user => user.UserRole != UserRoleType.Dealer);
            User dealer = users.FirstOrDefault(user => user.UserRole == UserRoleType.Dealer);

            List<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();
            int lastRoundId = lastRound.Id;

            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(users);
            userRounds = userRounds.Where(item => item.RoundId == lastRoundId);

            var dealTwoCardsRequest = new RequestDealTwoCardsModel();

            foreach (User user in usersExceptDealer)
            {
                dealTwoCardsRequest = new RequestDealTwoCardsModel();
                dealTwoCardsRequest.GameId = gameId;
                dealTwoCardsRequest.Moves = moves;
                dealTwoCardsRequest.RoundId = lastRoundId;
                dealTwoCardsRequest.User = user;

                DealTwoCards(dealTwoCardsRequest);
                cardToUser = _handCardsProvider.Get(user).Cards;

                ResponseUserViewModel userResult = usersResult.FirstOrDefault(item => item.Nickname == user.UserName);
                userResult.Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);

                userRound = userRounds.FirstOrDefault(item => item.UserId == user.Id);
                userRound.Points += cardToUser.Sum(card => card.CardValue);
            }

            await _moveRepository.CreateRange(moves);
            moves.RemoveRange(BusinessLogicConstant.StartPosition, moves.Count);

            dealTwoCardsRequest.User = dealer;
            DealTwoCards(dealTwoCardsRequest);
            cardToUser = _handCardsProvider.Get(dealer).Cards;

            ResponseUserViewModel dealerResult = usersResult.FirstOrDefault(item => item.UserRole == UserRoleType.Dealer);
            dealerResult.Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);

            await _moveRepository.CreateRange(moves);

            userRound = userRounds.FirstOrDefault(item => item.UserId == dealer.Id);
            userRound.Points += cardToUser.Sum(card => card.CardValue);

            result = await GameResponse(game.Id);

            await _userRoundRepository.UpdateRange(userRounds);

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
            User user = users.FirstOrDefault(item => item.UserRole == UserRoleType.People);
            HandCards handCardsFromCache = _handCardsProvider.Get(user);

            Round lastRound = rounds.Last();
            UserRound userRound = await _userRoundRepository.Get(user.Id, lastRound.Id);

            var move = new Move();

            ResponseGameViewModel result = await GameResponse(gameId);
            
            if (userRound.RoundStatus != RoundStatusType.None)
            {
                return result;
            }

            move = new Move();
            move.UserId = user.Id;
            move.RoundId = lastRound.Id;
            move.CardId = cardToUser.Id;

            await _moveRepository.Create(move);

            userRound.Points += cardToUser.CardValue;

            var updateRequest = new RequestUpdateCacheModel();
            updateRequest.Card = cardToUser;
            updateRequest.Deck = deckFromCache;
            updateRequest.GameId = gameId;
            updateRequest.HandCards = handCardsFromCache;

            UpdateCache(updateRequest);

            await _userRoundRepository.Update(userRound);

            result = await GameResponse(game.Id);

            return result;
        }

        public async Task<ResponseGameViewModel> DealCardToDealer(int gameId)
        {
            Deck deckFromCache = _deckProvider.Get(gameId);
            List<Card> deckFromCacheCards = deckFromCache.Cards;
            List<Card> deckFromCacheDiscardPile = deckFromCache.DiscardPile;

            Game game = await _gameRepository.Get(gameId);

            User dealer = await _userRepository.Get(BusinessLogicConstant.DealerNickname);
            HandCards handCardsFromCache = _handCardsProvider.Get(dealer); 
            int dealerId = dealer.Id;

            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();
            int lastRoundId = lastRound.Id;

            var move = new Move();
            var movesToCreate = new List<Move>();

            UserRound userRound = await _userRoundRepository.Get(dealerId, lastRoundId);

            ResponseGameViewModel result = await GameResponse(gameId);
            ResponseRoundViewModel resultLastRound = result.Rounds.Last();

            bool takeNextCard = true;

            while (takeNextCard)
            {
                Card cardToUser = deckFromCacheCards.Last();

                bool isMoreThan17Points = CheckDealerPoints(dealer);

                result.IsOver = await CheckGameOver(game);

                if (isMoreThan17Points)
                {
                    takeNextCard = false;
                    break;
                }

                move = new Move();
                move.UserId = dealerId;
                move.RoundId = lastRoundId;
                move.CardId = cardToUser.Id;

                movesToCreate.Add(move);

                userRound.Points += cardToUser.CardValue;

                var updateRequest = new RequestUpdateCacheModel();
                updateRequest.Card = cardToUser;
                updateRequest.Deck = deckFromCache;
                updateRequest.GameId = gameId;
                updateRequest.HandCards = handCardsFromCache;

                UpdateCache(updateRequest);
            }

            await _userRoundRepository.Update(userRound);

            var requestFinishRound = new RequestFinishRoundModel();
            requestFinishRound.LastRound = lastRound;
            requestFinishRound.MovesToCreate = movesToCreate;
            requestFinishRound.GameResult = result;

            result = await FinishRound(requestFinishRound);

            if(result.IsOver)
            {
                await DistributeMoney(gameId);
            }

            return result;
        }

        public async Task<ResponseGameViewModel> DealCardsToAllBots(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);
            IEnumerable<User> bots = users.Where(user => user.UserRole == UserRoleType.Bot);

            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            Round lastRound = rounds.Last();

            List<UserRound> botsRounds = await _userRoundRepository.Get(bots, lastRound.Id);

            List<Move> moves = await _moveRepository.Get(bots, lastRound.Id);
            var movesToCreate = new List<Move>();
            var userRoundsToUpdate = new List<UserRound>();

            List<Card> allBotCards = await _cardRepository.Get(moves);

            foreach(User bot in bots)
            {
                IEnumerable<Move> currentMoves = moves.Where(move => move.UserId == bot.Id);
                List<Card> currentCards = allBotCards.Where(card => currentMoves.Select(move => move.CardId).Contains(card.Id)).ToList();

                UserRound currentRounds = botsRounds.FirstOrDefault(item => item.UserId == bot.Id);

                var dealCardsRequest = new RequestDealCardsToBotModel();

                dealCardsRequest.GameId = gameId;
                dealCardsRequest.Bot = bot;
                dealCardsRequest.Cards = currentCards;
                dealCardsRequest.UserRoundsToUpdate = userRoundsToUpdate;
                dealCardsRequest.UserRound = currentRounds;

                List<Move> newMoves = DealCardsToBot(dealCardsRequest);

                movesToCreate.AddRange(newMoves);
            }
            

            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
            await _moveRepository.CreateRange(movesToCreate);

            ResponseGameViewModel response = await GameResponse(game.Id);

            return response;
        }
        #endregion
    }
}