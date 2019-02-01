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
            DateOfCreation = DateTime.Now;
            RoundQuantity = EntitiesConstant._DefaultRoundQuantity;
        }
    }
}
