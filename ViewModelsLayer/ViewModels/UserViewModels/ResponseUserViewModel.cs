using System;
using System.Collections.Generic;
using ViewModelsLayer.ViewModels.CardViewModels;
using EntitiesLayer.Entities;
using EntitiesLayer.Enums;

namespace ViewModelsLayer.ViewModels.UserViewModels
{
    public class ResponseUserViewModel
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public UserRole UserRole { get; set; }
        public List<ResponseCardViewModel> Cards { get; set; }
    }
}
