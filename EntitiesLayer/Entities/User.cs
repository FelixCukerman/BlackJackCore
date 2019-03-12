using System;
using System.ComponentModel.DataAnnotations;
using EntitiesLayer.Abstraction;
using EntitiesLayer.Constants;
using EntitiesLayer.Enums;

namespace EntitiesLayer.Entities
{
    public class User : BaseEntity
    {
        [Required]
        public string Nickname { get; set; }
        [Required]
        public UserRoleType UserRole { get; set; }
        [Required]
        public int Cash { get; set; }


        public User()
        {
            DateOfCreation = DateTime.Now;
            Nickname = EntitiesConstant._DefaultNickname;
            UserRole = UserRoleType.None;
            Cash = EntitiesConstant._DefaultCash;
        }
    }
}
