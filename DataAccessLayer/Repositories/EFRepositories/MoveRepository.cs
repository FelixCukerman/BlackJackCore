using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Entities;
using DataAccessLayer.Interfaces;
using DataAccessLayer;

namespace DataAccessLayer.Repositories
{
    public class MoveRepository : GenericRepository<Move>, IMoveRepository
    {
        public MoveRepository(GameContext data) : base(data)
        {
        }

        public async Task<List<Move>> Get(IEnumerable<User> users)
        {
            return await _data.Moves.Where(x => users.Select(elem => elem.Id).Contains((int)x.UserId)).ToListAsync();
        }
        public async Task<List<Move>> Get(IEnumerable<User> users, int roundId)
        {
            return await _data.Moves.Where(x => users.Select(elem => elem.Id).Contains((int)x.UserId) && x.RoundId == roundId).ToListAsync();
        }
        public async Task<List<Move>> Get(int userId, int roundId)
        {
            return await _data.Moves.Where(x => x.UserId == userId && x.RoundId == roundId).ToListAsync();
        }
        public async Task<List<Move>> Get(Round round)
        {
            return await _data.Moves.Where(x => x.RoundId == round.Id).ToListAsync();
        }
    }
}
