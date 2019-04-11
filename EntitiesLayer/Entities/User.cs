using System;
using System.ComponentModel.DataAnnotations;
using EntitiesLayer.Constants;
using EntitiesLayer.Enums;
using EntitiesLayer.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace EntitiesLayer.Entities
{
    public class User : IdentityUser<int>, IBaseEntity
    {
        [Required]
        public int Cash { get; set; }
        [Required]
        public DateTime DateOfCreation { get; set; }
        [Required]
        public UserRoleType UserRole { get; set; }
        
        public User()
        {
            Cash = EntitiesConstants.DefaultCash;
        }
    }
}
