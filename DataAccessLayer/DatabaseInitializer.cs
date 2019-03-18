using System.Collections.Generic;
using DataAccessLayer.Constants;
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
            var cards = new List<Card>();

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

        public static List<User> GetBots()
        {
            var bots = new List<User>();

            int botId = 2;

            for (int i = 0; i < ConfigureConstant._MaxBotsCount; i++)
            {
                var bot = new User();

                bot.Id = botId;
                bot.UserName = $"Bot#{i + 1}";
                bot.UserRole = UserRoleType.BotPlayer;

                bots.Add(bot);

                botId++;
            }

            return bots;
        }
    }
}