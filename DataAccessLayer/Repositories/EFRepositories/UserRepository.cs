using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Enums;

namespace DataAccessLayer.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(GameContext data) : base(data)
        {
        }
        public async Task<List<User>> Get(List<UserGames> userGames)
        {
            return await _data.Users.Where(x => userGames.Select(elem => elem.UserId).Contains(x.Id)).ToListAsync();
        }
        public async Task<List<User>> Get(List<int> userIds)
        {
            return await _data.Users.Where(x => userIds.Contains(x.Id)).ToListAsync();
        }
        public async Task<User> Get(string nickname)
        {
            return await _data.Users.FirstOrDefaultAsync(x => x.Nickname == nickname && (x.UserRole == UserRole.PeoplePlayer || x.UserRole == UserRole.Dealer));
        }
    }
}
