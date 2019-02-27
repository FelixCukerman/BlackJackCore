using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Entities;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer.Repositories
{
    public class MoveRepository : GenericRepository<Move>, IMoveRepository
    {
        public MoveRepository(GameContext data) : base(data)
        {
        }

        public async Task<List<Move>> Get(IEnumerable<User> users)
        {
            return await _data.Moves.Where(move => users.Select(elem => elem.Id).Contains((int)move.UserId)).ToListAsync();
        }
        public async Task<List<Move>> Get(IEnumerable<User> users, int roundId)
        {
            return await _data.Moves.Where(move => users.Select(elem => elem.Id).Contains((int)move.UserId) && move.RoundId == roundId).ToListAsync();
        }
        public async Task<List<Move>> Get(int userId, int roundId)
        {
            return await _data.Moves.Where(move => move.UserId == userId && move.RoundId == roundId).ToListAsync();
        }
        public async Task<List<Move>> Get(Round round)
        {
            return await _data.Moves.Where(move => move.RoundId == round.Id).ToListAsync();
        }
        public async Task<List<Move>> Get(List<Round> rounds)
        {
            return await _data.Moves.Where(move => rounds.Select(item => item.Id).Contains((int)move.RoundId)).ToListAsync();
        }
    }
}