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
    public class DapperRoundRepository : IRoundRepository
    {
        private string connectionString = null;
        public DapperRoundRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<Round>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<Round>();
            }
        }

        public async Task<Round> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAsync<Round>(id);
            }
        }

        public async Task Create(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.InsertAsync(round);
                round.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<Round> rounds)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < rounds.Count(); i++)
                    {
                        var invoice = await db.InsertAsync(rounds.ElementAt(i));
                        rounds.ElementAt(i).Id = invoice;
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Update(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.UpdateAsync(round);
            }
        }

        public async Task UpdateRange(IEnumerable<Round> rounds)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < rounds.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(rounds.ElementAt(i));
                    }
                }
                scope.Complete();
            }
        }

        public async Task Delete(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.DeleteAsync(round);
            }
        }

        public async Task DeleteRange(IEnumerable<Round> rounds)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < rounds.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(rounds.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task<List<Round>> Get(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Rounds WHERE GameId = @gameId");
                var gameId = game.Id;
                var rounds = await db.QueryAsync<Round>(sqlQuery.ToString(), new { gameId });
                return rounds.ToList();
            }
        }
    }
}