using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            return await _data.UserRounds.Where(item => item.RoundId == round.Id).ToListAsync();
        }
        public async Task<List<UserRound>> Get(List<Round> rounds)
        {
            return await _data.UserRounds.Where(item => rounds.Select(elem => elem.Id).Contains((int)item.RoundId)).ToListAsync();
        }
        public async Task<List<UserRound>> Get(List<User> users)
        {
            return await _data.UserRounds.Where(item => users.Select(user => user.Id).Contains((int)item.UserId)).ToListAsync();
        }
        public async Task<List<UserRound>> Get(IEnumerable<User> users, int roundId)
        {
            return await _data.UserRounds.Where(item => users.Select(user => user.Id).Contains((int)item.UserId) && item.RoundId == roundId).ToListAsync();
        }
        public async Task<UserRound> Get(int userId, int roundId)
        {
            return await _data.UserRounds.FirstOrDefaultAsync(item => item.UserId == userId && item.RoundId == roundId);
        }
    }
}
