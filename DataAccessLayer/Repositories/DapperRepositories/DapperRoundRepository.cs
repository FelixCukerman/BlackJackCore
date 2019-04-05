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
    public class DapperRoundRepository : DapperGenericRepository<Round>, IRoundRepository
    {
        public DapperRoundRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<Round>> Get(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Rounds WHERE GameId = @gameId";

                IEnumerable<Round> rounds = await db.QueryAsync<Round>(sqlQuery, new { gameId = game.Id });

                return rounds.ToList();
            }
        }

        public async Task<List<Round>> Get(IEnumerable<int> gamesIds)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Rounds WHERE GameId IN @gamesIds";

                IEnumerable<Round> rounds = await db.QueryAsync<Round>(sqlQuery, new { gamesIds });

                return rounds.ToList();
            }
        }
    }
}