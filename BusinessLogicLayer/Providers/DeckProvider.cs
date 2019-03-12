using System;
using Microsoft.Extensions.Caching.Memory;
using BusinessLogicLayer.DTOs;
using BusinessLogicLayer.Constants;
using BusinessLogicLayer.Interfaces;

namespace BusinessLogicLayer.Providers
{
    public class DeckProvider : IDeckProvider
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
            var options = new MemoryCacheEntryOptions();
            options.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(BusinessLogicConstant._DataRetentionTime);

            _cache.Set(gameId, deck, options);
        }

        public void Update(Deck deck, int gameId)
        {
            _cache.Set(gameId, deck, DateTime.Now.AddMinutes(BusinessLogicConstant._DataRetentionTime));
        }

        public void Delete(int gameId)
        {
            _cache.Remove(gameId);
        }
    }
}
