using System.Collections.Generic;
using ViewModelsLayer.ViewModels.CardViewModels;
using EntitiesLayer.Enums;

namespace ViewModelsLayer.ViewModels.UserViewModels
{
    public class ResponseUserViewModel
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public int Cash { get; set; }
        public UserRoleType UserRole { get; set; }
        public List<ResponseCardViewModel> Cards { get; set; }
    }
}
