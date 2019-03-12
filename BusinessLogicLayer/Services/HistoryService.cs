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
            var game = await _gameRepository.Get(gameId);
            if (game == null)
            {
                throw new NullReferenceException();
            }

            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);
            var userRounds = await _userRoundRepository.Get(rounds);
            int winsQuantity = 0;
            List<ResponseGameOverViewModel> result = new List<ResponseGameOverViewModel>();

            for (int i = 0; i < users.Count; i++)
            {
                //the dealer isn't included in this statistic
                if (users[i].UserRole == UserRoleType.Dealer)
                {
                    continue;
                }
                var currentUserRounds = userRounds.Where(item => item.UserId == users[i].Id);
                IEnumerable<UserRound> wins = currentUserRounds.Where(x => x.RoundStatus == RoundStatusType.Winner);
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

        #region Public Methods
        public async Task<IEnumerable<int>> GetRoundIdsByGame(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            var rounds = await _roundRepository.Get(game);
            IEnumerable<int> roundIds = rounds.Select(round => round.Id);

            return roundIds;
        }

        public async Task<IEnumerable<int>> GetAllGameIdsByUser(int userId)
        {
            var user = await _userRepository.Get(userId);
            var userGame = await _userGamesRepository.Get(user);
            IEnumerable<int> userGameIds = userGame.Select(item => (int)item.GameId);

            return userGameIds;
        }

        public async Task<List<HistoryUserRoundViewModel>> GetHistoryUserRounds(RequestHistoryUserRoundViewModel request)
        {
            List<HistoryUserRoundViewModel> result = new List<HistoryUserRoundViewModel>();
            var game = await _gameRepository.Get(request.GameId);
            var round = await _roundRepository.Get(request.RoundId);
            if (game == null || round == null)
            {
                throw new NullReferenceException();
            }

            var userRounds = await _userRoundRepository.Get(round);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var moves = (await _moveRepository.Get(round)).OrderBy(x => x.DateOfCreation);
            var cards = await _cardRepository.Get(moves);

            for(int i = 0; i < userRounds.Count; i++)
            {
                User currentUser = users.FirstOrDefault(user => user.Id == userRounds[i].UserId);
                IEnumerable<Card> userCards = cards.Where(card => moves.Where(move => move.UserId == currentUser.Id).Select(move => move.CardId).Contains(card.Id));
                IEnumerable<ResponseCardViewModel> cardViewModels = _mapper.Map<List<ResponseCardViewModel>>(userCards);
                HistoryUserRoundViewModel historyUserRound = new HistoryUserRoundViewModel();
                historyUserRound.Cards = new List<ResponseCardViewModel>();

                historyUserRound.UserId = currentUser.Id;
                historyUserRound.Nickname = currentUser.Nickname;
                historyUserRound.UserRole = currentUser.UserRole;
                historyUserRound.Points = userRounds[i].Points;
                historyUserRound.RoundStatus = userRounds[i].RoundStatus;
                historyUserRound.Cards.AddRange(cardViewModels);

                result.Add(historyUserRound);
            }

            return result;
        }

        public async Task<List<HistoryUserDetailsViewModel>> GetHistoryUserDetails(int gameId)
        {
            List<HistoryUserDetailsViewModel> result = new List<HistoryUserDetailsViewModel>();
            var game = await _gameRepository.Get(gameId);
            if (game == null)
            {
                throw new NullReferenceException();
            }

            List<ResponseGameOverViewModel> userStatistic = await GameOverResponse(gameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            //take the first player with the max number of wins
            ResponseGameOverViewModel firstWinner = userStatistic.OrderByDescending(item => item.WinsQuantity).FirstOrDefault();
            //take players by #firstWinner
            List<ResponseGameOverViewModel> winners = userStatistic.Where(item => item.WinsQuantity == firstWinner.WinsQuantity).ToList();
            List<ResponseGameOverViewModel> loosers = userStatistic.Except(winners).ToList();

            for (int i = 0; i < userGames.Count; i++)
            {
                User currentUser = users.FirstOrDefault(user => user.Id == userGames[i].UserId);
                HistoryUserDetailsViewModel historyUserDetails = new HistoryUserDetailsViewModel();

                if(currentUser.UserRole == UserRoleType.Dealer)
                {
                    continue;
                }

                historyUserDetails.UserId = currentUser.Id;
                historyUserDetails.Nickname = currentUser.Nickname;
                historyUserDetails.UserRole = currentUser.UserRole;
                historyUserDetails.Rate = userGames[i].Rate;

                if(winners.Select(item => item.UserId).Contains(currentUser.Id))
                {
                    historyUserDetails.Status = UserGameStatus.Winner;
                }
                if (loosers.Select(item => item.UserId).Contains(currentUser.Id))
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