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
    public class UserRepository : IUserRepository
    {
        private GameContext data;
        public UserRepository(GameContext data)
        {
            this.data = data;
        }
        public async Task<IEnumerable<User>> Get()
        {
            return await data.Users.ToListAsync<User>();
        }
        public async Task<User> Get(int id)
        {
            return await data.Users.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<User>> Get(List<UserGames> userGames)
        {
            return await data.Users.Where(x => userGames.Select(elem => elem.UserId).Contains(x.Id)).ToListAsync();
        }
        public async Task<User> Get(string nickname)
        {
            return await data.Users.FirstOrDefaultAsync(x => x.Nickname == nickname && x.UserRole == UserRole.PeoplePlayer);
        }
        public async Task Create(User user)
        {
            data.Users.Add(user);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<User> users)
        {
            data.Users.AddRange(users);
            await data.SaveChangesAsync();
        }
        public async Task Update(User user)
        {
            data.Entry(user).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<User> users)
        {
            var userList = users.ToList();
            for (int i = 0; i < users.Count(); i++)
            {
                data.Entry(userList).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(User user)
        {
            if (user != null)
            {
                data.Users.Remove(user);
            }
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<User> users)
        {
            if (users != null)
            {
                data.Users.RemoveRange(users);
            }
            await data.SaveChangesAsync();
        }
    }
}
