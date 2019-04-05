using EntitiesLayer.Enums;
using System.Collections.Generic;
using ViewModelsLayer.ViewModels.CardViewModels;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class ResponseUserRoundDetailsViewModel : UserBaseViewModel
    {
        public int Points { get; set; }
        public RoundStatusType RoundStatus { get; set; }
        public List<ResponseCardViewModel> Cards { get; set; }
    }
}