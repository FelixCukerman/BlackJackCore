﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
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
            return await data.Cards.Where(x => moves.Select(elem => elem.CardId).Contains(x.Id)).ToListAsync();
        }
    }
}