using System;
using System.Collections.Generic;
using EntitiesLayer.Entities;

namespace BusinessLogicLayer.DTOs
{
    public class HandCards
    {
        public User User { get; set; }
        public List<Card> Cards { get; set; }
    }
}
