﻿using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using BusinessLogicLayer.DTOs;
using EntitiesLayer.Entities;
using System.Linq;
using BusinessLogicLayer.Constants;
using BusinessLogicLayer.Interfaces;

namespace BusinessLogicLayer.Providers
{
    public class HandCardsProvider : IHandCardsProvider
    {
        private IMemoryCache _cache;
        private MemoryCacheEntryOptions options;

        public HandCardsProvider(IMemoryCache cache)
        {
            _cache = cache;

            options = new MemoryCacheEntryOptions();
            options.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(ConfigureConstant._DataRetentionTime);
        }

        public HandCards Get(User user)
        {
            return _cache.Get(user.UserName) as HandCards;
        }

        public List<HandCards> Get(IEnumerable<User> users)
        {
            var handUsers = new List<HandCards>();
            for (int i = 0; i < users.Count(); i++)
            {
                handUsers.Add(_cache.Get(users.ElementAt(i).UserName) as HandCards);
            }
            return handUsers;
        }

        public void Add(HandCards handCards)
        {
            _cache.Set(handCards.User.UserName, handCards, options);
        }

        public void AddRange(List<HandCards> handCards)
        {
            for (int i = 0; i < handCards.Count; i++)
            {
                _cache.Set(handCards[i].User.UserName, handCards[i], options);
            }
        }

        public void Update(HandCards handCards)
        {
            _cache.Set(handCards.User.UserName, handCards, DateTime.Now.AddMinutes(ConfigureConstant._DataRetentionTime));
        }

        public void Delete(User user)
        {
            _cache.Remove(user.UserName);
        }
    }
}
