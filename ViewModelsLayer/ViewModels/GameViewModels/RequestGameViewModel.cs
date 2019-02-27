using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace ViewModelsLayer.ViewModels.GameViewModels
{
    public class RequestGameViewModel
    {
        [Required]
        public RequestUserViewModel User { get; set; }
        [Required]
        [Range(0, 4, ErrorMessage = "Invalid bots quantity")]
        public int BotQuantity { get; set; }
        [Required]
        [Range(0, 15, ErrorMessage = "Invalid rounds quantity")]
        public int RoundQuantity { get; set; }
        [Required]
        [Range(1, 1000000, ErrorMessage = "Invalid rate")]
        public int UserRate { get; set; }
    }
}