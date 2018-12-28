using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EntitiesLayer.Abstraction;

namespace EntitiesLayer.Entities
{
    public class User : BaseEntity
    {
        [Required]
        public string Nickname { get; set; }
        [Required]
        public UserRole UserRole { get; set; }
        [NotMapped]
        public List<Card> Cards { get; set; }
        [Required]
        public int Cash { get; set; }

        public User()
        {
            DateOfCreation = DateTime.Now;
            Nickname = "default";
            UserRole = UserRole.None;
            Cards = new List<Card>();
            Cash = 5;
        }
    }

    public enum UserRole
    {
        None = 0,
        BotPlayer = 1,
        PeoplePlayer = 2,
        Dealer = 3
    }
}
