using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories
{
    public class UserGamesRepository : IUserGamesRepository
    {
        private GameContext data;
        public UserGamesRepository(GameContext data)
        {
            this.data = data;
        }
        public async Task<IEnumerable<UserGames>> Get()
        {
            return await data.UserGames.ToListAsync<UserGames>();
        }
        public async Task<UserGames> Get(int id)
        {
            return await data.UserGames.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<IEnumerable<UserGames>> Get(Func<UserGames, bool> predicate)
        {
            return data.Set<UserGames>().AsNoTracking().Where(predicate).ToList();
        }
        public async Task Create(UserGames userGames)
        {
            data.UserGames.Add(userGames);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<UserGames> userGames)
        {
            data.UserGames.AddRange(userGames);
            await data.SaveChangesAsync();
        }
        public async Task Update(UserGames userGames)
        {
            data.Entry(userGames).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<UserGames> userGames)
        {
            for (int i = 0; i < userGames.Count(); i++)
            {
                data.Entry(userGames).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(UserGames userGames)
        {
            data.UserGames.Remove(userGames);
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<UserGames> userGames)
        {
            data.UserGames.RemoveRange(userGames);
            await data.SaveChangesAsync();
        }
    }
}
