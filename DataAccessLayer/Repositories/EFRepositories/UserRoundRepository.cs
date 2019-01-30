using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class UserRoundRepository : GenericRepository<UserRound>, IUserRoundRepository
    {
        public UserRoundRepository(GameContext data) : base(data)
        {
        }
        public async Task<List<UserRound>> Get(Round round)
        {
            return await data.UserRounds.Where(x => x.RoundId == round.Id).ToListAsync();
        }
        public async Task<List<UserRound>> Get(List<User> users)
        {
            return await data.UserRounds.Where(x => users.Select(elem => elem.Id).Contains((int)x.UserId)).ToListAsync();
        }
        public async Task<UserRound> Get(int userId, int roundId)
        {
            return await data.UserRounds.FirstOrDefaultAsync(x => x.UserId == userId && x.RoundId == roundId);
        }
    }
}
