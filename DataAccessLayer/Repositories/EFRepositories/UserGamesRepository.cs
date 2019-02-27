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
            return await _data.UserGames.Where(x => x.GameId == round.GameId).ToListAsync();
        }
        public async Task<List<UserGames>> Get(Game game)
        {
            return await _data.UserGames.Where(x => x.GameId == game.Id).ToListAsync();
        }
        public async Task<UserGames> Get(int userId, int gameId)
        {
            return await _data.UserGames.Where(x => x.GameId == gameId && x.UserId == userId).FirstOrDefaultAsync();
        }
    }
}
