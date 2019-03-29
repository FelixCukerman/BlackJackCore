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
            List<UserRound> result = await _data.UserRounds.Where(item => item.RoundId == round.Id).ToListAsync();

            return result;
        }

        public async Task<List<UserRound>> Get(IEnumerable<Round> rounds)
        {
            IEnumerable<int> roundsIds = rounds.Select(elem => elem.Id);

            List<UserRound> result = await _data.UserRounds.Where(item => roundsIds.Contains((int)item.RoundId)).ToListAsync();

            return result;
        }

        public async Task<List<UserRound>> Get(IEnumerable<User> users)
        {
            IEnumerable<int> usersIds = users.Select(user => user.Id);

            List<UserRound> result = await _data.UserRounds.Where(item => usersIds.Contains((int)item.UserId)).ToListAsync();

            return result;
        }

        public async Task<List<UserRound>> Get(IEnumerable<User> users, int roundId)
        {
            IEnumerable<int> usersIds = users.Select(user => user.Id);

            List<UserRound> result = await _data.UserRounds.Where(item => usersIds.Contains((int)item.UserId) && item.RoundId == roundId).ToListAsync();

            return result;
        }

        public async Task<UserRound> Get(int userId, int roundId)
        {
            UserRound result = await _data.UserRounds.FirstOrDefaultAsync(item => item.UserId == userId && item.RoundId == roundId);

            return result;
        }
    }
}
