using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.HistoryViewModels;
using System.Linq;
using ViewModelsLayer.ViewModels.CardViewModels;
using ViewModelsLayer.ViewModels.GameOverViewModel;
using EntitiesLayer.Enums;
using ViewModelsLayer.Enums;
using BusinessLogicLayer.RequestModels.HistoryRequestModels;
using BusinessLogicLayer.Models.ResponseModels.HistoryResponseModels;

namespace BusinessLogicLayer.Services
{
    public class HistoryService : IHistoryService
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
        #endregion

        #region Constructor
        public HistoryService(IGameRepository gameRepository, ICardRepository cardRepository, IRoundRepository roundRepository, IMoveRepository moveRepository, IUserGamesRepository userGamesRepository, IUserRepository userRepository, IUserRoundRepository userRoundRepository, IMapper mapper)
        {
            _gameRepository = gameRepository;
            _cardRepository = cardRepository;
            _roundRepository = roundRepository;
            _moveRepository = moveRepository;
            _userGamesRepository = userGamesRepository;
            _userRepository = userRepository;
            _userRoundRepository = userRoundRepository;
            _mapper = mapper;
        }
        #endregion

        #region Private Methods
        private List<ResponseUsersStatisticModel> GetUsersStatistic(RequestUsersStatisticModel request)
        {
            IEnumerable<User> users = request.Users;
            IEnumerable<UserRound> userRounds = request.UserRounds;

            IEnumerable<User> usersExceptDealer = users.Where(user => user.UserRole != UserRoleType.Dealer);

            int winsQuantity = 0;

            var result = new List<ResponseUsersStatisticModel>();

            foreach(User user in usersExceptDealer)
            {
                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.UserId == user.Id);
                IEnumerable<UserRound> wins = currentUserRounds.Where(item => item.RoundStatus == RoundStatusType.Winner);

                winsQuantity = wins?.Count() ?? 0;

                result.Add(new ResponseUsersStatisticModel { UserId = user.Id, Username = user.UserName, WinsQuantity = winsQuantity });
            }

            return result;
        }

        private ResponseRoundDetailsViewModel GetRoundDetails(RequestRoundDetailsModel request)
        {
            var result = new ResponseRoundDetailsViewModel();
            result.Round = new List<ResponseUserRoundDetailsViewModel>();

            IEnumerable<UserRound> userRounds = request.UserRounds;
            Round round = request.Round;
            IEnumerable<User> users = request.Users;
            IEnumerable<Move> moves = request.Moves;
            IEnumerable<Card> cards = request.Cards;

            IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.RoundId == round.Id);

            foreach (UserRound userRound in currentUserRounds)
            {
                User currentUser = users.FirstOrDefault(user => user.Id == userRound.UserId);

                IEnumerable<Move> userMoves = moves.Where(move => move.UserId == userRound.UserId && move.RoundId == userRound.RoundId);
                IEnumerable<int> cardsIds = userMoves.Select(move => move.CardId);
                IEnumerable<Card> userCards = cards.Where(card => cardsIds.Contains(card.Id));

                ResponseUserRoundDetailsViewModel historyUserRound = new ResponseUserRoundDetailsViewModel();

                historyUserRound.Cards = new List<ResponseCardViewModel>();
                historyUserRound.UserId = currentUser.Id;
                historyUserRound.Nickname = currentUser.UserName;
                historyUserRound.UserRole = currentUser.UserRole;
                historyUserRound.Points = userRound.Points;
                historyUserRound.RoundStatus = userRound.RoundStatus;

                IEnumerable<ResponseCardViewModel> cardViewModels = _mapper.Map<List<ResponseCardViewModel>>(userCards);
                historyUserRound.Cards.AddRange(cardViewModels);

                result.Round.Add(historyUserRound);
            }

            return result;
        }

        private List<HistoryGameStatisticViewModel> GetGameStatistic(RequestGameStatisticModel request)
        {
            List<HistoryGameStatisticViewModel> result = new List<HistoryGameStatisticViewModel>();

            IEnumerable<User> users = request.Users;
            IEnumerable<UserRound> userRounds = request.UserRounds;
            IEnumerable<UserGames> userGames = request.UserGames;

            var usersStatisticRequest = new RequestUsersStatisticModel { UserRounds = userRounds, Users = users };

            IEnumerable<ResponseUsersStatisticModel> userStatistic = GetUsersStatistic(usersStatisticRequest);

            ResponseUsersStatisticModel firstWinner = userStatistic.OrderByDescending(item => item.WinsQuantity).FirstOrDefault();

            IEnumerable<ResponseUsersStatisticModel> winners = userStatistic.Where(item => item.WinsQuantity == firstWinner.WinsQuantity);
            IEnumerable<ResponseUsersStatisticModel> loosers = userStatistic.Except(winners);

            foreach (User user in users)
            {
                if (user.UserRole == UserRoleType.Dealer)
                {
                    continue;
                }

                HistoryGameStatisticViewModel historyUserDetails = new HistoryGameStatisticViewModel();
                UserGames userGame = userGames.FirstOrDefault(item => item.UserId == user.Id);

                historyUserDetails.UserId = user.Id;
                historyUserDetails.Nickname = user.UserName;
                historyUserDetails.UserRole = user.UserRole;
                historyUserDetails.Rate = userGame.Rate;

                if (winners.Select(item => item.UserId).Contains(user.Id))
                {
                    historyUserDetails.Status = UserGameStatus.Winner;
                }

                if (loosers.Select(item => item.UserId).Contains(user.Id))
                {
                    historyUserDetails.Status = UserGameStatus.Looser;
                }

                result.Add(historyUserDetails);
            }

            return result;
        }
        #endregion

        #region Public Methods
        public async Task<ResponseGameDetailsViewModel> GetGameDetails(int gameId)
        {
            var result = new ResponseGameDetailsViewModel();
            result.Rounds = new List<ResponseRoundDetailsViewModel>();

            Game game = await _gameRepository.Get(gameId);
            IEnumerable<UserGames> userGames = await _userGamesRepository.Get(game);
            IEnumerable<User> users = await _userRepository.Get(userGames);

            IEnumerable<Round> rounds = await _roundRepository.Get(game);
            IEnumerable<UserRound> userRounds = await _userRoundRepository.Get(rounds);
            IEnumerable<Move> moves = await _moveRepository.Get(rounds);
            IEnumerable<Card> cards = await _cardRepository.Get(moves);

            foreach (Round round in rounds)
            {
                var roundDetailsRequest = new RequestRoundDetailsModel { Cards = cards, Moves = moves, Round = round, UserRounds = userRounds, Users = users };

                var roundDetails = new ResponseRoundDetailsViewModel();
                roundDetails = GetRoundDetails(roundDetailsRequest);

                result.Rounds.Add(roundDetails);
            }

            var gameStatisticRequest = new RequestGameStatisticModel { UserGames = userGames, UserRounds = userRounds, Users = users};

            result.Statistic = GetGameStatistic(gameStatisticRequest);

            return result;
        } 

        public async Task<List<ResponseUserForAutocompleteView>> GetUsersForAutocomplete()
        {
            IEnumerable<User> users = await _userRepository.GetAllPersons();

            var result = new List<ResponseUserForAutocompleteView>();

            foreach(User user in users)
            {
                var itemToResult = new ResponseUserForAutocompleteView();
                itemToResult.Id = user.Id;
                itemToResult.Username = user.UserName;

                result.Add(itemToResult);
            }

            return result;
        }

        public async Task<List<ResponseGamesByUserViewModel>> GetGamesByUser(int userId)
        {
            var response = new List<ResponseGamesByUserViewModel>();

            User user = await _userRepository.Get(userId);
            IEnumerable<UserGames> userGame = await _userGamesRepository.Get(user);

            IEnumerable<int> userGameIds = userGame.Select(item => (int)item.GameId);
            List<Round> rounds = await _roundRepository.Get(userGameIds);

            foreach(int gameId in userGameIds)
            {
                IEnumerable<Round> currentGameRounds = rounds.Where(round => round.GameId == gameId);
                IEnumerable<int> roundsIds = currentGameRounds.Select(round => round.Id);

                var historyGames = new ResponseGamesByUserViewModel { GameId = gameId, RoundsIds = new List<int>() };
                historyGames.RoundsIds.AddRange(roundsIds);

                response.Add(historyGames);
            }

            return response;
        }  
        #endregion
    }
}