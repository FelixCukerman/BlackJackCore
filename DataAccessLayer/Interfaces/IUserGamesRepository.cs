using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IUserGamesRepository : IRepository<UserGames>
    {
        Task<List<UserGames>> Get(Round round);
        Task<List<UserGames>> Get(Game game);
        Task<UserGames> Get(int userId, int gameId);
    }
}
