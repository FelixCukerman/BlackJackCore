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
            IEnumerable<int> usersIds = users.Select(elem => elem.Id);

            List<Move> result = await _data.Moves.Where(move => usersIds.Contains((int)move.UserId)).ToListAsync(); 

            return result;
        }

        public async Task<List<Move>> Get(IEnumerable<User> users, int roundId)
        {
            IEnumerable<int> usersIds = users.Select(elem => elem.Id);

            List<Move> result = await _data.Moves.Where(move => usersIds.Contains((int)move.UserId) && move.RoundId == roundId).ToListAsync();

            return result;
        }

        public async Task<List<Move>> Get(int userId, int roundId)
        {
            List<Move> result = await _data.Moves.Where(move => move.UserId == userId && move.RoundId == roundId).ToListAsync();

            return result;
        }

        public async Task<List<Move>> Get(Round round)
        {
            List<Move> result = await _data.Moves.Where(move => move.RoundId == round.Id).ToListAsync();

            return result;
        }

        public async Task<List<Move>> Get(IEnumerable<Round> rounds)
        {
            IEnumerable<int> roundsIds = rounds.Select(item => item.Id);

            List<Move> result = await _data.Moves.Where(move => roundsIds.Contains((int)move.RoundId)).ToListAsync();

            return result;
        }
    }
}