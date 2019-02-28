using EntitiesLayer.Enums;

namespace ViewModelsLayer.ViewModels.HistoryViewModels
{
    public class UserBaseViewModel
    {
        public int UserId { get; set; }
        public string Nickname { get; set; }
        public UserRole UserRole { get; set; }
    }
}
