using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations;
using EntitiesLayer.Constants;

namespace EntitiesLayer.Entities
{
    public class Game : BaseEntity
    {
        [Required]
        public int RoundQuantity { get; set; }

        public Game()
        {
            RoundQuantity = EntitiesConstants.DefaultRoundQuantity;
        }
    }
}
