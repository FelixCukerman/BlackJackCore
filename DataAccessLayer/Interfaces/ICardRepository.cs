using EntitiesLayer.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface ICardRepository : IRepository<Card>
    {
        Task<List<Card>> Get(IEnumerable<Move> moves);
    }
}
