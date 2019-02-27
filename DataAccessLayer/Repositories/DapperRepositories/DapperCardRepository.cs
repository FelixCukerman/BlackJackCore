using DataAccessLayer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using EntitiesLayer.Entities;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using System.Transactions;
using Dapper.Contrib.Extensions;
using System.Text;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperCardRepository : ICardRepository
    {
        private string connectionString = null;
        public DapperCardRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<Card>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<Card>();
            }
        }

        public async Task<Card> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                return await db.GetAsync<Card>(id);
            }
        }

        public async Task Create(Card card)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                var invoice = await db.InsertAsync(card);
                card.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<Card> items)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < items.Count(); i++)
                    {
                        var invoice = await db.InsertAsync(items.ElementAt(i));
                        items.ElementAt(i).Id = invoice;
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Update(Card card)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                var invoice = await db.UpdateAsync(card);
            }
        }

        public async Task UpdateRange(IEnumerable<Card> cards)
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < cards.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(cards.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Delete(Card card)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                var invoice = await db.DeleteAsync(card);
            }
        }

        public async Task DeleteRange(IEnumerable<Card> cards)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < cards.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(cards.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
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
