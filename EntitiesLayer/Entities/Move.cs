using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntitiesLayer.Entities
{
    public class Move : BaseEntity
    {
        public int? RoundId { get; set; }
        [ForeignKey("RoundId")]
        public Round Round { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int CardId { get; set; }
        [ForeignKey("CardId")]
        public Card Card { get; set; }

        public Move()
        {
            DateOfCreation = DateTime.Now;
        }
    }
}
