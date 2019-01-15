using System;
using EntitiesLayer.Abstraction;
using System.ComponentModel.DataAnnotations.Schema;
using Dapper.Contrib.Extensions;

namespace EntitiesLayer.Entities
{
    public class Round : BaseEntity
    {
        public int? GameId { get; set; }
        [ForeignKey("GameId")]
        [Write(false)]
        [Computed]
        public Game Game { get; set; }

        public Round()
        {
            DateOfCreation = DateTime.Now;
        }
    }
}
