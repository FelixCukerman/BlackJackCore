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
    public class RoundRepository : IRoundRepository
    {
        private GameContext data;
        public RoundRepository(GameContext data)
        {
            this.data = data;
        }
        public async Task<IEnumerable<Round>> Get()
        {
            return await data.Rounds.ToListAsync<Round>();
        }
        public async Task<Round> Get(int id)
        {
            return await data.Rounds.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<IEnumerable<Round>> Get(Func<Round, bool> predicate)
        {
            return data.Set<Round>().AsNoTracking().Where(predicate).ToList();
        }
        public async Task Create(Round round)
        {
            data.Rounds.Add(round);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<Round> rounds)
        {
            data.Rounds.AddRange(rounds);
            await data.SaveChangesAsync();
        }
        public async Task Update(Round round)
        {
            data.Entry(round).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<Round> rounds)
        {
            var roundList = rounds.ToList();
            for (int i = 0; i < roundList.Count; i++)
            {
                data.Entry(roundList).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(Round round)
        {
            if (round != null)
            {
                data.Rounds.Remove(round);
            }
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<Round> rounds)
        {
            if (rounds != null)
            {
                data.Rounds.RemoveRange(rounds);
            }
            await data.SaveChangesAsync();
        }
    }
}