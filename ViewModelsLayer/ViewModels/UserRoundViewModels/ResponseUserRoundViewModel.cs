using EntitiesLayer.Enums;

namespace ViewModelsLayer.ViewModels.UserRoundViewModels
{
    public class ResponseUserRoundViewModel
    {
        public int UserId { get; set; }
        public string Nickname { get; set; }
        public RoundStatus RoundStatus { get; set; }
        public int Points { get; set; }
    }
}
