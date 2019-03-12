using DataAccessLayer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using EntitiesLayer.Entities;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperCardRepository : DapperGenericRepository<Card>, ICardRepository
    {
        public DapperCardRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<Card>> Get(IEnumerable<Move> moves)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Cards WHERE Id IN @cardIds";

                IEnumerable<int> cardIds = moves.Select(move => move.CardId);

                IEnumerable<Card> cards = await db.QueryAsync<Card>(sqlQuery, new { cardIds });

                return cards.ToList();
            }
        }
    }
}
