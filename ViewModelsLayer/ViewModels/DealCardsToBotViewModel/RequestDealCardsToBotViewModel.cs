using System.ComponentModel.DataAnnotations;

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
