using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperUserRoundRepository : DapperGenericRepository<UserRound>, IUserRoundRepository
    {
        private string connectionString = null;
        public DapperUserRoundRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
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
