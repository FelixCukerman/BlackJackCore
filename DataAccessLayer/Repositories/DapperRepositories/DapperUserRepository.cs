using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Dapper;
using Dapper.Contrib.Extensions;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperUserRepository : IUserRepository
    {
        private string connectionString = null;
        public DapperUserRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<User>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<User>();
            }
        }

        public async Task<User> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAsync<User>(id);
            }
        }

        public async Task Create(User user)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.InsertAsync(user);
                user.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<User> users)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < users.Count(); i++)
                    {
                        var invoice = await db.InsertAsync(users.ElementAt(i));
                        users.ElementAt(i).Id = invoice;
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Update(User user)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.UpdateAsync(user);
            }
        }

        public async Task UpdateRange(IEnumerable<User> users)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < users.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(users.ElementAt(i));
                    }
                }
                scope.Complete();
            }
        }

        public async Task Delete(User user)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.DeleteAsync(user);
            }
        }

        public async Task DeleteRange(IEnumerable<User> users)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < users.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(users.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task<List<User>> Get(List<UserGames> userGames)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Users WHERE Id IN(@userIds)");
                List<int?> userIds = userGames.Select(m => m.UserId).ToList();
                var users = await db.QueryAsync<User>(sqlQuery.ToString(), new { userIds });
                return users.ToList();
            }
        }

        public async Task<User> Get(string nickname)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Users WHERE Nickname = @nickname");
                var user = await db.QueryFirstOrDefaultAsync<User>(sqlQuery.ToString(), new { nickname });
                return user;
            }
        }
    }
}
