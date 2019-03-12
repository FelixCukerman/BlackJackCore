using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperGameRepository : DapperGenericRepository<Game>, IGameRepository
    {
        public DapperGameRepository(string connectionString) : base(connectionString)
        {
            this.connectionString = connectionString;
        }
    }
}
