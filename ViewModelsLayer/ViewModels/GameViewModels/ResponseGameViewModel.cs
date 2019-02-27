﻿using System.Collections.Generic;
using ViewModelsLayer.ViewModels.UserViewModels;
using ViewModelsLayer.ViewModels.RoundViewModels;
using ViewModelsLayer.ViewModels.UserGameViewModels;

namespace ViewModelsLayer.ViewModels.GameViewModels
{
    public class ResponseGameViewModel
    {
        public int Id { get; set; }
        public List<ResponseUserViewModel> Users { get; set; }
        public List<ResponseRoundViewModel> Rounds { get; set; }
        public List<ResponseUserGameViewModel> UserGames { get; set; }
        public bool IsOver { get; set; }
    }
}
