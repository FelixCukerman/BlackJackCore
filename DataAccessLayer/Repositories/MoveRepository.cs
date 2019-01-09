using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Entities;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer.Repositories
{
    public class MoveRepository : IMoveRepository
    {
        private GameContext data;
        public MoveRepository(GameContext data)
        {
            this.data = data;
        }
        public async Task<IEnumerable<Move>> Get()
        {
            return await data.Moves.ToListAsync<Move>();
        }
        public async Task<Move> Get(int id)
        {
            return await data.Moves.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Move>> Get(IEnumerable<User> users)
        {
            return await data.Moves.Where(x => users.Select(elem => elem.Id).Contains((int)x.UserId)).ToListAsync();
        }
        public async Task<List<Move>> Get(int userId, int roundId)
        {
            return await data.Moves.Where(x => x.UserId == userId && x.RoundId == roundId).ToListAsync();
        }
        public async Task<List<Move>> Get(Round round)
        {
            return await data.Moves.Where(x => x.RoundId == round.Id).ToListAsync();
        }
        public async Task Create(Move move)
        {
            data.Moves.Add(move);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<Move> moves)
        {
            data.Moves.AddRange(moves);
            await data.SaveChangesAsync();
        }
        public async Task Update(Move move)
        {
            data.Entry(move).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<Move> moves)
        {
            var moveList = moves.ToList();
            for (int i = 0; i < moves.Count(); i++)
            {
                data.Entry(moveList).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(Move move)
        {
            if (move != null)
            {
                data.Moves.Remove(move);
            }
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<Move> moves)
        {
            if (moves != null)
            {
                data.Moves.RemoveRange(moves);
            }
            await data.SaveChangesAsync();
        }
    }
}
