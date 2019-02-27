using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.HistoryViewModels;

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

        public async Task GetHistoryByGame(int gameId)
        {
            ResponseHistoryViewModel result = new ResponseHistoryViewModel();
            var game = await _gameRepository.Get(gameId);
            if(game == null)
            {
                throw new NullReferenceException();
            }

            var rounds = await _roundRepository.Get(game);
            var userRounds = await _userRoundRepository.Get(rounds);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var moves = await _moveRepository.Get(rounds);
            var cards = await _cardRepository.Get(moves);

            for(int i = 0; i < rounds.Count; i++)
            {

            }
        }
    }
}
