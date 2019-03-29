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
        protected string connectionString = null;
        public DapperGenericRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<T>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                IEnumerable<T> result = await db.GetAllAsync<T>();

                return result;
            }
        }

        public async Task<T> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();

                T result = await db.GetAsync<T>(id);

                return result;
            }
        }

        public async Task Create(T item)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                db.Open();

                int invoice = await db.InsertAsync(item);

                item.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<T> items)
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    foreach(T item in items)
                    {
                        int invoice = await db.InsertAsync(item);

                        item.Id = invoice;
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

                bool invoice = await db.UpdateAsync(item);
            }
        }

        public async Task UpdateRange(IEnumerable<T> items)
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    foreach(T item in items)
                    {
                        bool invoice = await db.UpdateAsync(item);
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

                bool invoice = await db.DeleteAsync(item);
            }
        }

        public async Task DeleteRange(IEnumerable<T> items)
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    foreach(T item in items)
                    {
                        bool invoice = await db.DeleteAsync(item);
                    }

                    scope.Complete();
                }
            }
        }
    }
}
