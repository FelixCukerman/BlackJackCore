using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using DataAccessLayer;
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
            return await _data.Rounds.Where(x => x.GameId == game.Id).ToListAsync();
        }
    }
}