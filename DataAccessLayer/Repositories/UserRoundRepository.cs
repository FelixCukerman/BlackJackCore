using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class UserRoundRepository : IUserRoundRepository
    {
        private GameContext data;
        public UserRoundRepository(GameContext data)
        {
            this.data = data;
        }
        public async Task<IEnumerable<UserRound>> Get()
        {
            return await data.UserRounds.ToListAsync<UserRound>();
        }
        public async Task<UserRound> Get(int id)
        {
            return await data.UserRounds.FirstOrDefaultAsync(x => x.Id == id);
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
        public async Task Create(UserRound userRound)
        {
            data.UserRounds.Add(userRound);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<UserRound> userRounds)
        {
            data.UserRounds.AddRange(userRounds);
            await data.SaveChangesAsync();
        }
        public async Task Update(UserRound userRound)
        {
            data.Entry(userRound).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<UserRound> userRounds) //доделать потом
        {
            for (int i = 0; i < userRounds.Count(); i++)
            {
                data.Entry(userRounds.ElementAt(i)).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(UserRound userRound)
        {
            if (userRound != null)
            {
                data.UserRounds.Remove(userRound);
            }
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<UserRound> userRounds)
        {
            if (userRounds != null)
            {
                data.UserRounds.RemoveRange(userRounds);
            }
            await data.SaveChangesAsync();
        }
    }
}
