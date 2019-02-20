using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using BusinessLogicLayer.DTOs;
using System.Linq;
using BusinessLogicLayer.Constants;

namespace BusinessLogicLayer.Providers
{
    public class DeckProvider
    {
        private IMemoryCache _cache;
        public DeckProvider(IMemoryCache cache)
        {
            _cache = cache;
        }

        public Deck Get(int gameId)
        {
            return _cache.Get(gameId) as Deck;
        }

        public void Add(Deck deck, int gameId)
        {
            _cache.Set(gameId, deck, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
            });
        }

        public void Update(Deck deck, int gameId)
        {
            _cache.Set(gameId, deck, DateTime.Now.AddMinutes(30));
        }

        public void Delete(int gameId)
        {
            _cache.Remove(gameId);
        }
    }
}
