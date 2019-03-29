using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class RoundRepository : GenericRepository<Round>, IRoundRepository
    {
        public RoundRepository(GameContext data) : base(data)
        {
        }

        public async Task<List<Round>> Get(Game game)
        {
            List<Round> result = await _data.Rounds.Where(round => round.GameId == game.Id).ToListAsync();

            return result;
        }
    }
}