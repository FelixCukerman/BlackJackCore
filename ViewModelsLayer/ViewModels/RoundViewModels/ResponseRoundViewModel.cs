using System.Collections.Generic;
using ViewModelsLayer.ViewModels.UserRoundViewModels;

namespace ViewModelsLayer.ViewModels.RoundViewModels
{
    public class ResponseRoundViewModel
    {
        public int RoundId { get; set; }
        public bool IsOver { get; set; }
        public List<ResponseUserRoundViewModel> UserRound { get; set; }
    }
}