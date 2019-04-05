using ViewModelsLayer.Enums;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class HistoryGameStatisticViewModel : UserBaseViewModel
    {
        public int Rate { get; set; }
        public UserGameStatus Status { get; set; }
    }
}
