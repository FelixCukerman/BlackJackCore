using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories
{
    public class UserGamesRepository : GenericRepository<UserGames>, IUserGamesRepository
    {
        public UserGamesRepository(GameContext data) : base(data)
        {
        }

        public async Task<List<UserGames>> Get(Round round)
        {
            List<UserGames> result = await _data.UserGames.Where(item => item.GameId == round.GameId).ToListAsync();

            return result;
        }

        public async Task<List<UserGames>> Get(Game game)
        {
            List<UserGames> result = await _data.UserGames.Where(item => item.GameId == game.Id).ToListAsync();

            return result;
        }

        public async Task<UserGames> Get(int userId, int gameId)
        {
            UserGames result = await _data.UserGames.FirstOrDefaultAsync(item => item.GameId == gameId && item.UserId == userId);

            return result;
        }

        public async Task<List<UserGames>> Get(User user)
        {
            List<UserGames> result = await _data.UserGames.Where(item => item.UserId == user.Id).ToListAsync();

            return result;
        }
    }
}
