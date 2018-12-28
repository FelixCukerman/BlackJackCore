using System;
using System.Collections.Generic;
using EntitiesLayer.Entities;

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
            for (int i = 1; i < 5; i++)
            {
                for (int j = (int)CardName.Two; j < (int)CardName.Ten + 1; j++)
                {
                    Cards.Add(new Card { Suit = (Suit)i, CardName = (CardName)j, CardValue = j });
                }
                Cards.Add(new Card { Suit = (Suit)i, CardName = CardName.Jack, CardValue = 10 });
                Cards.Add(new Card { Suit = (Suit)i, CardName = CardName.Queen, CardValue = 10 });
                Cards.Add(new Card { Suit = (Suit)i, CardName = CardName.King, CardValue = 10 });
                Cards.Add(new Card { Suit = (Suit)i, CardName = CardName.Ace, CardValue = 11 });
            }
        }
    }
}
