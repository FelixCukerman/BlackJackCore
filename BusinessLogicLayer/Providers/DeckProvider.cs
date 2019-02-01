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

        public Deck Get()
        {
            return _cache.Get(ConfigureConstant._keyForDeck) as Deck;
        }

        public void Add(Deck deck)
        {
            _cache.Set(ConfigureConstant._keyForDeck, deck, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30)
            });
        }

        public void Update(Deck deck)
        {
            _cache.Set(ConfigureConstant._keyForDeck, deck, DateTime.Now.AddMinutes(30));
        }

        public void Delete()
        {
            _cache.Remove(ConfigureConstant._keyForDeck);
        }
    }
}
