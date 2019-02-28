using EntitiesLayer.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using ViewModelsLayer.Enums;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class HistoryUserDetailsViewModel : UserBaseViewModel
    {
        public int Rate { get; set; }
        public UserGameStatus Status { get; set; }
    }
}
