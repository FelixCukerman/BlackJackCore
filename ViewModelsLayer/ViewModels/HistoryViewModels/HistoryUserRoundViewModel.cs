using EntitiesLayer.Enums;
using System.Collections.Generic;
using ViewModelsLayer.ViewModels.CardViewModels;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class HistoryUserRoundViewModel : UserBaseViewModel
    {
        public int Points { get; set; }
        public RoundStatus RoundStatus { get; set; }
        public List<ResponseCardViewModel> Cards { get; set; }
    }
}