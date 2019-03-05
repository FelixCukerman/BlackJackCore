using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class CardRepository : GenericRepository<Card>, ICardRepository
    {
        public CardRepository(GameContext data) : base(data)
        {
        }
        public async Task<List<Card>> Get(IEnumerable<Move> moves)
        {
            List<int> cardsIds = moves.Select(elem => elem.CardId).ToList();
            return await _data.Cards.Where(card => cardsIds.Contains(card.Id)).ToListAsync();
        }
    }
}