using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<List<User>> Get(IEnumerable<UserGames> userGames);
        Task<List<User>> Get(IEnumerable<int> userIds);
        Task<List<User>> GetBotsByQuantity(int requestQuantity);
        Task<User> Get(string username);
        Task<List<User>> GetAllPersons();
    }
}
