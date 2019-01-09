using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<List<User>> Get(List<UserGames> userGames);
        Task<User> Get(string nickname);
    }
}
