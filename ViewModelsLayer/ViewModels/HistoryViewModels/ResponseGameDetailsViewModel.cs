using System.Collections.Generic;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class ResponseGameDetailsViewModel
    {
        public List<ResponseRoundDetailsViewModel> Rounds { get; set; }
        public List<HistoryGameStatisticViewModel> Statistic { get; set; }
    }
}
