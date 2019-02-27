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
        private string connectionString = null;
        public DapperRoundRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<Round>> Get(Game game)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Rounds WHERE GameId = @gameId";
                var gameId = game.Id;
                var rounds = await db.QueryAsync<Round>(sqlQuery, new { gameId });
                return rounds.ToList();
            }
        }
    }
}