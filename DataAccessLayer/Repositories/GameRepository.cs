using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntitiesLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class GameRepository : IGameRepository
    {
        private GameContext data;
        public GameRepository(GameContext data)
        {
            this.data = data;
        }
        public async Task<IEnumerable<Game>> Get()
        {
            return await data.Games.ToListAsync<Game>();
        }
        public async Task<Game> Get(int id)
        {
            return await data.Games.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task Create(Game game)
        {
            data.Games.Add(game);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<Game> games)
        {
            data.Games.AddRange(games);
            await data.SaveChangesAsync();
        }
        public async Task Update(Game game)
        {
            data.Entry(game).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<Game> games)
        {
            var gameList = games.ToList();
            for (int i = 0; i < games.Count(); i++)
            {
                data.Entry(gameList).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(Game game)
        {
            if (game != null)
            {
                data.Games.Remove(game);
            }
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<Game> games)
        {
            if (games != null)
            {
                data.Games.RemoveRange(games);
            }
            await data.SaveChangesAsync();
        }
    }
}