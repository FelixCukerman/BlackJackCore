using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRoundRepository : IRepository<UserRound>
    {
        Task<List<UserRound>> Get(Round round);
        Task<List<UserRound>> Get(IEnumerable<Round> rounds);
        Task<List<UserRound>> Get(IEnumerable<User> users);
        Task<List<UserRound>> Get(IEnumerable<User> users, int roundId);
        Task<UserRound> Get(int userId, int roundId);
    }
}
