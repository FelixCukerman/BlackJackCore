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
    public class DapperMoveRepository : DapperGenericRepository<Move>, IMoveRepository
    {
        public DapperMoveRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<Move>> Get(int userId, int roundId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Moves WHERE UserId = @userId AND RoundId = @roundId";

                IEnumerable<Move> moves = await db.QueryAsync<Move>(sqlQuery, new { userId, roundId } );

                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Moves WHERE RoundId = @roundId";

                var roundId = round.Id;

                IEnumerable<Move> moves = await db.QueryAsync<Move>(sqlQuery, new { roundId });

                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(IEnumerable<User> users)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Moves WHERE UserId IN @userIds";

                IEnumerable<int> userIds = users.Select(user => user.Id);

                IEnumerable<Move> moves = await db.QueryAsync<Move>(sqlQuery, new { userIds });

                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(IEnumerable<User> users, int roundId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Moves WHERE UserId IN @userIds AND RoundId = @roundId";

                IEnumerable<int> userIds = users.Select(user => user.Id);

                IEnumerable<Move> moves = await db.QueryAsync<Move>(sqlQuery, new { userIds, roundId });

                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(List<Round> rounds)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Moves WHERE RoundId IN @roundIds";

                IEnumerable<int> roundIds = rounds.Select(round => round.Id);

                IEnumerable<Move> moves = await db.QueryAsync<Move>(sqlQuery, new { roundIds });

                return moves.ToList();
            }
        }
    }
}