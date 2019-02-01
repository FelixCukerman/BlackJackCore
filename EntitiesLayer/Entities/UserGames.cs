using System;
using System.ComponentModel.DataAnnotations.Schema;
using Dapper.Contrib.Extensions;
using EntitiesLayer.Abstraction;
using EntitiesLayer.Constants;

namespace EntitiesLayer.Entities
{
    [Dapper.Contrib.Extensions.Table("UserGames")]
    public class UserGames : BaseEntity
    {
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        [Write(false)]
        [Computed]
        public User User { get; set; }
        public int? GameId { get; set; }
        [ForeignKey("GameId")]
        [Write(false)]
        [Computed]
        public Game Game { get; set; }
        public int Rate { get; set; }

        public UserGames()
        {
            DateOfCreation = DateTime.Now;
            Rate = EntitiesConstant._DefaultRate;
        }
    }
}
