using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Dapper;
using Dapper.Contrib.Extensions;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperUserGamesRepository : IUserGamesRepository
    {
        private string connectionString = null;
        public DapperUserGamesRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<UserGames>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<UserGames>();
            }
        }

        public async Task<UserGames> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAsync<UserGames>(id);
            }
        }

        public async Task Create(UserGames userGames)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.InsertAsync(userGames);
                userGames.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<UserGames> userGames)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < userGames.Count(); i++)
                    {
                        var invoice = await db.InsertAsync(userGames.ElementAt(i));
                        userGames.ElementAt(i).Id = invoice;
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Update(UserGames userGames)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.UpdateAsync(userGames);
            }
        }

        public async Task UpdateRange(IEnumerable<UserGames> userGames)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < userGames.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(userGames.ElementAt(i));
                    }
                }
                scope.Complete();
            }
        }
        
        public async Task Delete(UserGames userGames)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.DeleteAsync(userGames);
            }
        }

        public async Task DeleteRange(IEnumerable<UserGames> userGames)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < userGames.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(userGames.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task<List<UserGames>> Get(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM UserGames WHERE GameId = @gameId");
                var gameId = round.GameId;
                var userGames = await db.QueryAsync<UserGames>(sqlQuery.ToString(), new { gameId });
                return userGames.ToList();
            }
        }

        public async Task<List<UserGames>> Get(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM UserGames WHERE GameId = @gameId");
                var gameId = game.Id;
                var userGames = await db.QueryAsync<UserGames>(sqlQuery.ToString(), new { gameId });
                return userGames.ToList();
            }
        }

        public async Task<UserGames> Get(int userId, int gameId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM UserGames WHERE GameId = @gameId AND UserId = @userId");
                var userGames = await db.QueryFirstOrDefaultAsync<UserGames>(sqlQuery.ToString(), new { gameId, userId });
                return userGames;
            }
        }
    }
}
