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

        private async Task<List<ResponseGameOverViewModel>> GameOverResponse(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);
            List<Round> rounds = await _roundRepository.Get(game);
            List<UserRound> userRounds = await _userRoundRepository.Get(rounds);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);
            IEnumerable<User> usersExceptDealer = users.Where(user => user.UserRole != UserRoleType.Dealer);

            int winsQuantity = 0;

            List<ResponseGameOverViewModel> result = new List<ResponseGameOverViewModel>();

            foreach(User user in usersExceptDealer)
            {
                IEnumerable<UserRound> currentUserRounds = userRounds.Where(item => item.UserId == user.Id);
                IEnumerable<UserRound> wins = currentUserRounds.Where(item => item.RoundStatus == RoundStatusType.Winner);

                winsQuantity = wins?.Count() ?? 0;

                result.Add(new ResponseGameOverViewModel { UserId = user.Id, Username = user.UserName, WinsQuantity = winsQuantity });
            }

            return result;
        }

        #region Public Methods
        public async Task<IEnumerable<int>> GetRoundIdsByGame(int gameId)
        {
            Game game = await _gameRepository.Get(gameId);
            List<Round> rounds = await _roundRepository.Get(game);

            IEnumerable<int> roundIds = rounds.Select(round => round.Id);

            return roundIds;
        } 

        public async Task<IEnumerable<int>> GetAllGameIdsByUser(int userId)
        {
            User user = await _userRepository.Get(userId);
            List<UserGames> userGame = await _userGamesRepository.Get(user);

            IEnumerable<int> userGameIds = userGame.Select(item => (int)item.GameId);

            return userGameIds;
        }

        public async Task<List<HistoryUserRoundViewModel>> GetHistoryUserRounds(RequestHistoryUserRoundViewModel request)
        {
            var result = new List<HistoryUserRoundViewModel>();

            Game game = await _gameRepository.Get(request.GameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);

            Round round = await _roundRepository.Get(request.RoundId);
            IOrderedEnumerable<Move> moves = (await _moveRepository.Get(round)).OrderBy(x => x.DateOfCreation);
            List<Card> cards = await _cardRepository.Get(moves);

            List<UserRound> userRounds = await _userRoundRepository.Get(round);

            foreach(UserRound userRound in userRounds)
            {
                User currentUser = users.FirstOrDefault(user => user.Id == userRound.UserId);
                IEnumerable<Move> userMoves = moves.Where(move => move.UserId == currentUser.Id);
                IEnumerable<int> cardsIds = userMoves.Select(move => move.CardId);
                IEnumerable<Card> userCards = cards.Where(card => cardsIds.Contains(card.Id));

                HistoryUserRoundViewModel historyUserRound = new HistoryUserRoundViewModel();

                historyUserRound.Cards = new List<ResponseCardViewModel>();
                historyUserRound.UserId = currentUser.Id;
                historyUserRound.Nickname = currentUser.UserName;
                historyUserRound.UserRole = currentUser.UserRole;
                historyUserRound.Points = userRound.Points;
                historyUserRound.RoundStatus = userRound.RoundStatus;

                IEnumerable<ResponseCardViewModel> cardViewModels = _mapper.Map<List<ResponseCardViewModel>>(userCards);
                historyUserRound.Cards.AddRange(cardViewModels);

                result.Add(historyUserRound);
            }

            return result;
        }

        public async Task<List<HistoryUserDetailsViewModel>> GetHistoryUserDetails(int gameId)
        {
            List<HistoryUserDetailsViewModel> result = new List<HistoryUserDetailsViewModel>();

            Game game = await _gameRepository.Get(gameId);

            List<ResponseGameOverViewModel> userStatistic = await GameOverResponse(gameId);

            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);

            ResponseGameOverViewModel firstWinner = userStatistic.OrderByDescending(item => item.WinsQuantity).FirstOrDefault();

            List<ResponseGameOverViewModel> winners = userStatistic.Where(item => item.WinsQuantity == firstWinner.WinsQuantity).ToList();
            List<ResponseGameOverViewModel> loosers = userStatistic.Except(winners).ToList();

            foreach(User user in users)
            {
                if(user.UserRole == UserRoleType.Dealer)
                {
                    continue;
                }

                HistoryUserDetailsViewModel historyUserDetails = new HistoryUserDetailsViewModel();
                UserGames userGame = userGames.FirstOrDefault(item => item.UserId == user.Id);

                historyUserDetails.UserId = user.Id;
                historyUserDetails.Nickname = user.UserName;
                historyUserDetails.UserRole = user.UserRole;
                historyUserDetails.Rate = userGame.Rate;

                if(winners.Select(item => item.UserId).Contains(user.Id))
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
    }
}