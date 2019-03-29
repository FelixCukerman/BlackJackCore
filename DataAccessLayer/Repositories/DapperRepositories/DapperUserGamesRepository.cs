using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperUserGamesRepository : DapperGenericRepository<UserGames>, IUserGamesRepository
    {
        public DapperUserGamesRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<UserGames>> Get(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM UserGames WHERE GameId = @gameId";

                IEnumerable<UserGames> userGames = await db.QueryAsync<UserGames>(sqlQuery, new { gameId = (int)round.GameId });

                return userGames.ToList();
            }
        }

        public async Task<List<UserGames>> Get(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM UserGames WHERE GameId = @gameId";

                IEnumerable<UserGames> userGames = await db.QueryAsync<UserGames>(sqlQuery, new { gameId = game.Id });

                return userGames.ToList();
            }
        }

        public async Task<UserGames> Get(int userId, int gameId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM UserGames WHERE GameId = @gameId AND UserId = @userId";

                UserGames userGames = await db.QueryFirstOrDefaultAsync<UserGames>(sqlQuery, new { gameId, userId });

                return userGames;
            }
        }

        public async Task<List<UserGames>> Get(User user)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM UserGames WHERE UserId = @userId";

                IEnumerable<UserGames> userGames = await db.QueryAsync<UserGames>(sqlQuery, new { userId = user.Id });

                return userGames.ToList();
            }
        }
    }
}
