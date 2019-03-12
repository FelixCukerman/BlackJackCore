using System.Collections.Generic;
using EntitiesLayer.Entities;
using EntitiesLayer.Enums;

namespace DataAccessLayer
{
    public class DatabaseInitializer
    {
        private static int _key = 0;
        private static int GenerateKey()
        {
            _key++;
            return _key;
        }
        public static List<Card> GetCards()
        {
            List<Card> cards = new List<Card>();

            for (int i = 1; i < 5; i++)
            {

                for (int j = (int)CardNameType.Two; j < (int)CardNameType.Ten + 1; j++)
                {
                    cards.Add(new Card { Id = GenerateKey(), Suit = (SuitType)i, CardName = (CardNameType)j, CardValue = j });
                }

                cards.Add(new Card { Id = GenerateKey(), Suit = (SuitType)i, CardName = CardNameType.Jack, CardValue = 10 });
                cards.Add(new Card { Id = GenerateKey(), Suit = (SuitType)i, CardName = CardNameType.Queen, CardValue = 10 });
                cards.Add(new Card { Id = GenerateKey(), Suit = (SuitType)i, CardName = CardNameType.King, CardValue = 10 });
                cards.Add(new Card { Id = GenerateKey(), Suit = (SuitType)i, CardName = CardNameType.Ace, CardValue = 11 });
            }

            return cards;
        }
    }
}