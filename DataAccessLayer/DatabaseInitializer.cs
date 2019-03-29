﻿using System;
using System.Collections.Generic;
using DataAccessLayer.Constants;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;
using EntitiesLayer.Enums;

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

            Array suits = Enum.GetValues(typeof(SuitType));

            foreach (SuitType suit in suits)
            {
                if(suit == SuitType.None)
                {
                    continue;
                }

                foreach(KeyValuePair<CardNameType, int> face in faces)
                {
                    cards.Add(new Card { Id = id, Suit = suit, CardName = face.Key, CardValue = face.Value });
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