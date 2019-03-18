using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Enums;
using DataAccessLayer.Constants;

namespace DataAccessLayer.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(GameContext data) : base(data)
        {
        }
        public async Task<List<User>> Get(List<UserGames> userGames)
        {
            return await _data.Users.Where(user => userGames.Select(elem => elem.UserId).Contains(user.Id)).ToListAsync();
        }
        public async Task<List<User>> Get(List<int> userIds)
        {
            return await _data.Users.Where(user => userIds.Contains(user.Id)).ToListAsync();
        }
        public async Task<User> Get(string nickname)
        {
            return await _data.Users.FirstOrDefaultAsync(user => user.UserName == nickname && (user.UserRole == UserRoleType.PeoplePlayer || user.UserRole == UserRoleType.Dealer));
        }
        public async Task<List<User>> GetBotsByQuantity(int requestQuantity)
        {
            return await _data.Users.Where(user => user.UserRole == UserRoleType.BotPlayer).Skip(ConfigureConstant._MaxBotsCount - requestQuantity).ToListAsync();
        }
    }
}
