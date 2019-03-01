using System.Collections.Generic;
using EntitiesLayer.Entities;
using EntitiesLayer.Enums;

namespace BusinessLogicLayer.DTOs
{
    public class Deck
    {
        public List<Card> Cards { get; set; }
        public List<Card> DiscardPile { get; set; }

        public Deck()
        {
            Cards = new List<Card>();
            DiscardPile = new List<Card>();
        }
    }
}
