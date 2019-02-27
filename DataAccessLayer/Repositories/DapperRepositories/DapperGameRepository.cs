using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperGameRepository : DapperGenericRepository<Game>, IGameRepository
    {
        private string connectionString = null;
        public DapperGameRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }
    }
}
