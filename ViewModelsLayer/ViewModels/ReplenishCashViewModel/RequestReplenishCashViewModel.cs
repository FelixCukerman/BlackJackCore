using System.ComponentModel.DataAnnotations;

namespace ViewModelsLayer.ViewModels.ReplenishCashViewModel
{
    public class RequestReplenishCashViewModel
    {
        [Required]
        public int GameId { get; set; }
        [Required]
        [Range(1, 1000000, ErrorMessage = "Invalid sum")]
        public int Cash { get; set; }
    }
}
