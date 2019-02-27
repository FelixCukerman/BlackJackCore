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
    public class DapperUserRepository : DapperGenericRepository<User>, IUserRepository
    {
        private string connectionString = null;
        public DapperUserRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<List<User>> Get(List<UserGames> userGames)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Users WHERE Id IN @userIds");
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

        public async Task<List<User>> Get(List<int> userIds)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Users WHERE Id IN @userIds";
                var users = await db.QueryAsync<User>(sqlQuery, new { userIds });
                return users.ToList();
            }
        }
    }
}
