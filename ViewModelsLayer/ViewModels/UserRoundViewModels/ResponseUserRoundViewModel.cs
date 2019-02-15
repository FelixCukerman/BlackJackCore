﻿using EntitiesLayer.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ViewModelsLayer.ViewModels.UserRoundViewModels
{
    public class ResponseUserRoundViewModel
    {
        public int UserId { get; set; }
        public RoundStatus RoundStatus { get; set; }
        public int Points { get; set; }
    }
}
