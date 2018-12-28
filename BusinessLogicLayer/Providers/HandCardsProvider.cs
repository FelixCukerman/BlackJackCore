using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using BusinessLogicLayer.DTOs;
using EntitiesLayer.Entities;

namespace BusinessLogicLayer.Providers
{
    public class HandCardsProvider
    {
        private IMemoryCache cache;
        public HandCardsProvider(IMemoryCache cache)
        {
            this.cache = cache;
        }

        public HandCards Get(User user)
        {
            return cache.Get(user.Nickname) as HandCards;
        }

        public List<HandCards> Get(List<User> users)
        {
            var handUsers = new List<HandCards>();
            for (int i = 0; i < users.Count; i++)
            {
                handUsers.Add(cache.Get(users[i].Nickname) as HandCards);
            }
            return handUsers;
        }

        public void Add(HandCards handCards)
        {
            cache.Set(handCards.User.Nickname, handCards, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
            });
        }

        public void Update(HandCards handCards)
        {
            cache.Set(handCards.User.Nickname, handCards, DateTime.Now.AddMinutes(30));
        }

        public void Delete(User user)
        {
            cache.Remove(user.Nickname);
        }
    }
}
