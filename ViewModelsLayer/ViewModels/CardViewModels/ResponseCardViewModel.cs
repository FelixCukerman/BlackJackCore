using EntitiesLayer.Enums;

namespace ViewModelsLayer.ViewModels.CardViewModels
{
    public class ResponseCardViewModel
    {
        public Suit Suit { get; set; }
        public int CardValue { get; set; }
        public CardName CardName { get; set; }
    }
}
