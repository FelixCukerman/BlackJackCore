using System;
using System.Collections.Generic;
using System.Text;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace ViewModelsLayer.ViewModels.GameViewModels
{
    public class RequestGameViewModel
    {
        public RequestUserViewModel User { get; set; }
        public int botQuantity { get; set; }
        public int roundQuantity { get; set; }
    }
}
