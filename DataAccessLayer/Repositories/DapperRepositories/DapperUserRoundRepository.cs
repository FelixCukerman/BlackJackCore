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
    public class DapperUserRoundRepository : IUserRoundRepository
    {
        private string connectionString = null;
        public DapperUserRoundRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<UserRound>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<UserRound>();
            }
        }

        public async Task<UserRound> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAsync<UserRound>(id);
            }
        }

        public async Task Create(UserRound userRound)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.InsertAsync(userRound);
                userRound.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<UserRound> userRounds)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < userRounds.Count(); i++)
                    {
                        var invoice = await db.InsertAsync(userRounds.ElementAt(i));
                        userRounds.ElementAt(i).Id = invoice;
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Update(UserRound userRound)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.UpdateAsync(userRound);
            }
        }

        public async Task UpdateRange(IEnumerable<UserRound> userRounds)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < userRounds.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(userRounds.ElementAt(i));
                    }
                }
                scope.Complete();
            }
        }

        public async Task Delete(UserRound userRound)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.DeleteAsync(userRound);
            }
        }

        public async Task DeleteRange(IEnumerable<UserRound> userRounds)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < userRounds.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(userRounds.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task<List<UserRound>> Get(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM UserRounds WHERE RoundId = @roundId");
                var roundId = round.Id;
                var userRounds = await db.QueryAsync<UserRound>(sqlQuery.ToString(), new { roundId });
                return userRounds.ToList();
            }
        }

        public async Task<List<UserRound>> Get(List<Round> rounds)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM UserRounds WHERE RoundId IN @roundIds");
                List<int> roundIds = rounds.Select(m => m.Id).ToList();
                var userRounds = await db.QueryAsync<UserRound>(sqlQuery.ToString(), new { roundIds });
                return userRounds.ToList();
            }
        }

        public async Task<List<UserRound>> Get(List<User> users)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM UserRounds WHERE UserId IN @userIds");
                List<int> userIds = users.Select(m => m.Id).ToList();
                var userRounds = await db.QueryAsync<UserRound>(sqlQuery.ToString(), new { userIds });
                return userRounds.ToList();
            }
        }

        public async Task<UserRound> Get(int userId, int roundId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM UserRounds WHERE UserId = @userId AND RoundId = @roundId");
                var userRounds = await db.QueryFirstOrDefaultAsync<UserRound>(sqlQuery.ToString(), new { userId, roundId });
                return userRounds;
            }
        }
    }
}
