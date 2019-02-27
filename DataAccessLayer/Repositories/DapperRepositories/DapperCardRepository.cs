using DataAccessLayer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using EntitiesLayer.Entities;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using System.Text;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperCardRepository : DapperGenericRepository<Card>, ICardRepository
    {
        private string connectionString = null;
        public DapperCardRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<Card>> Get(IEnumerable<Move> moves)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Cards WHERE Id IN @cardIds");
                List<int> cardIds = moves.Select(m => m.CardId).ToList();
                var cards = await db.QueryAsync<Card>(sqlQuery.ToString(), new { cardIds });
                return cards.ToList();
            }
        }
    }
}
