using System;
using System.Collections.Generic;
using System.Text;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace ViewModelsLayer.ViewModels.GameOverViewModel
{
    public class ResponseGameOverViewModel
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public int WinsQuantity { get; set; }
    }
}