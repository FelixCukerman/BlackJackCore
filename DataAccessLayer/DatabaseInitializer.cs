using System;
using System.Collections.Generic;
using DataAccessLayer.Constants;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using EntitiesLayer.Enums;
using System.Linq;

namespace DataAccessLayer
{
    public class DatabaseInitializer : IDatabaseInitializer
    {
        public List<Card> GetCards()
        {
            var cards = new List<Card>();

            int id = ConfigureConstant.FirstId;

            var faces = new Dictionary<CardNameType, int>
            {
                { CardNameType.Two, 2 },
                { CardNameType.Three, 3 },
                { CardNameType.Four, 4 },
                { CardNameType.Five, 5 },
                { CardNameType.Six, 6 },
                { CardNameType.Seven, 7 },
                { CardNameType.Eight, 8 },
                { CardNameType.Nine, 9 },
                { CardNameType.Ten, 10 },
                { CardNameType.Jack, 10 },
                { CardNameType.Queen, 10 },
                { CardNameType.King, 10 },
                { CardNameType.Ace, 11 }
            };
            
            IEnumerable<SuitType> suits = Enum.GetValues(typeof(SuitType)).Cast<SuitType>();

            foreach (SuitType suit in suits)
            {
                foreach(KeyValuePair<CardNameType, int> face in faces)
                {
                    var card = new Card();
                    card.Id = id;
                    card.Suit = suit;
                    card.CardName = face.Key;
                    card.CardValue = face.Value;

                    cards.Add(card);
                    id++;
                }
            }

            return cards;
        }

        public List<User> GetUsers()
        {
            var users = new List<User>();

            int id = ConfigureConstant.FirstId;

            var dealer = new User();
            dealer.Id = id;
            dealer.UserName = ConfigureConstant.DealerNickname;
            dealer.UserRole = UserRoleType.Dealer;

            users.Add(dealer);

            for (int i = 0; i < ConfigureConstant.MaxBotsCount; i++)
            {
                id++;

                var bot = new User();

                bot.Id = id;
                bot.UserName = $"Bot#{i + 1}";
                bot.UserRole = UserRoleType.Bot;

                users.Add(bot);
            }

            id++;

            var person = new User();
            person.Id = id;
            person.UserName = "Felix";
            person.UserRole = UserRoleType.People;

            users.Add(person);

            return users;
        }
    }
}