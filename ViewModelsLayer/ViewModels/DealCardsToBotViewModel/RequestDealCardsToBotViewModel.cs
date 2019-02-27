using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ViewModelsLayer.ViewModels.DealCardsToBotViewModel
{
    public class RequestDealCardsToBotViewModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int GameId { get; set; }
    }
}
