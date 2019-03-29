using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IMoveRepository : IRepository<Move>
    {
        Task<List<Move>> Get(int userId, int roundId);
        Task<List<Move>> Get(Round round);
        Task<List<Move>> Get(IEnumerable<User> users);
        Task<List<Move>> Get(IEnumerable<User> users, int roundId);
        Task<List<Move>> Get(IEnumerable<Round> rounds);
    }
}
