using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using BusinessLogicLayer.DTOs;
using System.Linq;

namespace BusinessLogicLayer.Providers
{
    public class DeckProvider
    {
        private IMemoryCache cache;
        public DeckProvider(IMemoryCache cache)
        {
            this.cache = cache;
        }

        public Deck Get()
        {
            return cache.Get("key") as Deck;
        }

        public void Add(Deck deck)
        {
            cache.Set("key", deck, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
            });
        }

        public void Update(Deck deck)
        {
            cache.Set("key", deck, DateTime.Now.AddMinutes(30));
        }

        public void Delete()
        {
            cache.Remove("key");
        }
    }
}
