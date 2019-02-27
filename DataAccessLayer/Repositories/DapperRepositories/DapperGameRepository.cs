using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Dapper.Contrib.Extensions;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperGameRepository : IGameRepository
    {
        private string connectionString = null;
        public DapperGameRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<Game>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<Game>();
            }
        }

        public async Task<Game> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAsync<Game>(id);
            }
        }

        public async Task Create(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.InsertAsync(game);
                game.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<Game> games)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for(int i = 0; i < games.Count(); i++)
                    {
                        var invoice = await db.InsertAsync(games.ElementAt(i));
                        games.ElementAt(i).Id = invoice;
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Update(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.UpdateAsync(game);
            }
        }

        public async Task UpdateRange(IEnumerable<Game> games)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for(int i = 0; i < games.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(games.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Delete(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.DeleteAsync(game);
            }
        }

        public async Task DeleteRange(IEnumerable<Game> games)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for(int i = 0; i < games.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(games.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }
    }
}
