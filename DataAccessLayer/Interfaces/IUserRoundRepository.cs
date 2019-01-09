using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRoundRepository : IRepository<UserRound>
    {
        Task<List<UserRound>> Get(Round round);
        Task<List<UserRound>> Get(List<User> users);
        Task<UserRound> Get(int userId, int roundId);
    }
}
