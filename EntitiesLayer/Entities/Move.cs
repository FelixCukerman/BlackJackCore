using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations.Schema;
using Dapper.Contrib.Extensions;

namespace EntitiesLayer.Entities
{
    public class Move : BaseEntity
    {
        public int? RoundId { get; set; }
        [ForeignKey("RoundId")]
        [Write(false)]
        [Computed]
        public Round Round { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        [Write(false)]
        [Computed]
        public User User { get; set; }
        public int CardId { get; set; }
        [ForeignKey("CardId")]
        [Write(false)]
        [Computed]
        public Card Card { get; set; }

        public Move()
        {
            DateOfCreation = DateTime.Now;
        }
    }
}
