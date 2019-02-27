using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ViewModelsLayer.ViewModels.UserViewModels
{
    public class RequestUserViewModel
    {
        [Required]
        [StringLength(15, MinimumLength = 2, ErrorMessage = "Username must be between 3 and 15 characters")]
        public string Nickname { get; set; }
    }
}
