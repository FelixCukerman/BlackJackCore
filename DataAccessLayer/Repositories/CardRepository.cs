using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class CardRepository : ICardRepository
    {
        private GameContext data;
        public CardRepository(GameContext data)
        {
            this.data = data;
        }
        public async Task<IEnumerable<Card>> Get()
        {
            return await data.Cards.ToListAsync<Card>();
        }
        public async Task<Card> Get(int id)
        {
            return await data.Cards.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<IEnumerable<Card>> Get(Func<Card, bool> predicate)
        {
            return data.Set<Card>().AsNoTracking().Where(predicate).ToList();
        }
        public async Task Create(Card card)
        {
            data.Cards.Add(card);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<Card> cards)
        {
            data.Cards.AddRange(cards);
            await data.SaveChangesAsync();
        }
        public async Task Update(Card card)
        {
            data.Entry(card).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<Card> cards)
        {
            var cardList = cards.ToList();
            for (int i = 0; i < cards.Count(); i++)
            {
                data.Entry(cardList[i]).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(Card card)
        {
            if (card != null)
            {
                data.Cards.Remove(card);
            }
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<Card> cards)
        {
            if (cards != null)
            {
                data.Cards.RemoveRange(cards);
            }
            await data.SaveChangesAsync();
        }
    }
}