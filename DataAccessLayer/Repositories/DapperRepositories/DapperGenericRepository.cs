using Dapper.Contrib.Extensions;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Abstraction;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Transactions;
using System.Linq;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperGenericRepository<T> : IRepository<T> where T : BaseEntity
    {
        private string connectionString = null;
        public DapperGenericRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<T>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<T>();
            }
        }

        public async Task<T> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                return await db.GetAsync<T>(id);
            }
        }

        public async Task Create(T item)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                var invoice = await db.InsertAsync(item);
                item.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<T> items)
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

        public async Task Update(T item)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                var invoice = await db.UpdateAsync(item);
            }
        }

        public async Task UpdateRange(IEnumerable<T> items)
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < items.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(items.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Delete(T item)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();
                var invoice = await db.DeleteAsync(item);
            }
        }

        public async Task DeleteRange(IEnumerable<T> items)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < items.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(items.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }
    }
}
