using EntitiesLayer.Enums;

namespace ViewModelsLayer.ViewModels.CardViewModels
{
    public class ResponseCardViewModel
    {
        public SuitType Suit { get; set; }
        public int CardValue { get; set; }
        public CardNameType CardName { get; set; }
    }
}
