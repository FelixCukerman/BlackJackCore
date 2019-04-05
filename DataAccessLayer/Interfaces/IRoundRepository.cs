using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IRoundRepository : IRepository<Round>
    {
        Task<List<Round>> Get(Game game);
        Task<List<Round>> Get(IEnumerable<int> gamesIds);
    }
}
