using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations.Schema;
using Dapper.Contrib.Extensions;

namespace EntitiesLayer.Entities
{
    public class UserRound : BaseEntity
    {
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        [Write(false)]
        [Computed]
        public User User { get; set; }
        public int? RoundId { get; set; }
        [ForeignKey("RoundId")]
        [Write(false)]
        [Computed]
        public Round Round { get; set; }
        public bool? IsWin { get; set; }

        public UserRound()
        {
            DateOfCreation = DateTime.Now;
        }
    }
}
