﻿using System;
using System.Collections.Generic;
using ViewModelsLayer.ViewModels.CardViewModels;
using EntitiesLayer.Entities;

namespace ViewModelsLayer.ViewModels.UserViewModels
{
    public class ResponseUserViewModel
    {
        public string Nickname { get; set; }
        public UserRole UserRole { get; set; }
        public List<ResponseCardViewModel> Cards { get; set; }
    }
}
