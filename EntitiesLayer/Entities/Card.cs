using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations;
using EntitiesLayer.Enums;

namespace EntitiesLayer.Entities
{
    public class Card : BaseEntity
    {
        [Required]
        public Suit Suit { get; set; }
        [Required]
        public int CardValue { get; set; }
        [Required]
        public CardName CardName { get; set; }

        public Card()
        {
            DateOfCreation = DateTime.Now;
        }
    }
}
