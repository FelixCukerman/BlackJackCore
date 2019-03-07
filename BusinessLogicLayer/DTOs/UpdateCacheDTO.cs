using EntitiesLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer.DTOs
{
    public class UpdateCacheDTO
    {
        public HandCards HandCards { get; set; }
        public Card Card { get; set; }
        public Deck Deck { get; set; }
        public int GameId { get; set; }
    }
}
