using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesLayer.Entities
{
    public class Round : BaseEntity
    {
        public int? GameId { get; set; }
        [ForeignKey("GameId")]
        public Game Game { get; set; }

        public Round()
        {
            DateOfCreation = DateTime.Now;
        }
    }
}
