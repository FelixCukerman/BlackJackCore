using System;
using System.Collections.Generic;
using System.Text;
using ViewModelsLayer.ViewModels.RoundViewModels;
using ViewModelsLayer.ViewModels.UserGameViewModels;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class ResponseHistoryViewModel
    {
        public List<RoundHistoryViewModel> Rounds { get; set; }
    }
}
