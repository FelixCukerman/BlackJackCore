using EntitiesLayer.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using ViewModelsLayer.ViewModels.CardViewModels;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class RoundHistoryViewModel
    {
        public int UserId { get; set; }
        public string Nickname { get; set; }
        public int Points { get; set; }
        public RoundStatus RoundStatus { get; set; }
        public List<ResponseCardViewModel> Cards { get; set; }
    }
}
