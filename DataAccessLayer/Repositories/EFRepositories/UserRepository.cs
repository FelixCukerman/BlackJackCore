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

        public async Task<List<User>> Get(IEnumerable<UserGames> userGames)
        {
            IEnumerable<int> usersIds = userGames.Select(elem => (int)elem.UserId);

            List<User> result = await _data.Users.Where(user => usersIds.Contains(user.Id)).ToListAsync();

            return result;
        }

        public async Task<List<User>> Get(IEnumerable<int> userIds)
        {
            List<User> result = await _data.Users.Where(user => userIds.Contains(user.Id)).ToListAsync();

            return result;
        }

        public async Task<List<User>> GetBotsByQuantity(int requestQuantity)
        {
            List<User> result = await _data.Users.Where(user => user.UserRole == UserRoleType.Bot).Skip(ConfigureConstant.MaxBotsCount - requestQuantity).ToListAsync();

            return result;
        }

        public async Task<User> Get(string username)
        {
            User result = await _data.Users.FirstOrDefaultAsync(user => user.UserName == username);

            return result;
        }
    }
}
