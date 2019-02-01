using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using BusinessLogicLayer.DTOs;
using EntitiesLayer.Entities;
using System.Linq;

namespace BusinessLogicLayer.Providers
{
    public class HandCardsProvider
    {
        private IMemoryCache _cache;
        public HandCardsProvider(IMemoryCache cache)
        {
            _cache = cache;
        }

        public HandCards Get(User user)
        {
            return _cache.Get(user.Nickname) as HandCards;
        }

        public List<HandCards> Get(IEnumerable<User> users)
        {
            var handUsers = new List<HandCards>();
            for (int i = 0; i < users.Count(); i++)
            {
                handUsers.Add(_cache.Get(users.ElementAt(i).Nickname) as HandCards);
            }
            return handUsers;
        }

        public void Add(HandCards handCards)
        {
            _cache.Set(handCards.User.Nickname, handCards, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
            });
        }

        public void AddRange(List<HandCards> handCards)
        {
            for(int i = 0; i < handCards.Count; i++)
            {
                _cache.Set(handCards[i].User.Nickname, handCards[i], new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
                });
            }
        }

        public void Update(HandCards handCards)
        {
            _cache.Set(handCards.User.Nickname, handCards, DateTime.Now.AddMinutes(30));
        }

        public void Delete(User user)
        {
            _cache.Remove(user.Nickname);
        }
    }
}
