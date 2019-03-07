using EntitiesLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer.DTOs
{
    public class DealTwoCardsDTO
    {
        public List<Move> Moves { get; set; }
        public User User { get; set; }
        public int GameId { get; set; }
        public int RoundId { get; set; }
    }
}
