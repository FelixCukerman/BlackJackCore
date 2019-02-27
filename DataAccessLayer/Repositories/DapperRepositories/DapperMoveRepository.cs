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
    public class DapperMoveRepository : DapperGenericRepository<Move>, IMoveRepository
    {
        private string connectionString = null;
        public DapperMoveRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<Move>> Get(int userId, int roundId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE UserId = @userId AND RoundId = @roundId");
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { userId, roundId } );
                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE RoundId = @roundId");
                var roundId = round.Id;
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { roundId });
                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(IEnumerable<User> users)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE UserId IN @userIds");
                List<int> userIds = users.Select(m => m.Id).ToList();
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { userIds });
                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(IEnumerable<User> users, int roundId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE UserId IN @userIds AND RoundId = @roundId");
                List<int> userIds = users.Select(m => m.Id).ToList();
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { userIds, roundId });
                return moves.ToList();
            }
        }
    }
}