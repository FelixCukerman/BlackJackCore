using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations;
using EntitiesLayer.Enums;

namespace EntitiesLayer.Entities
{
    public class Card : BaseEntity
    {
        [Required]
        public SuitType Suit { get; set; }
        [Required]
        public int CardValue { get; set; }
        [Required]
        public CardNameType CardName { get; set; }
    }
}
