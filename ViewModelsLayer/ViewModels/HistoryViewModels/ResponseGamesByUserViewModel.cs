using System.Collections.Generic;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class ResponseGamesByUserViewModel
    {
        public int GameId { get; set; }
        public List<int> RoundsIds { get; set; }
    }
}
