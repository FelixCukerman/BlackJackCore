using EntitiesLayer.Entities;

namespace BusinessLogicLayer.DTOs
{
    public class UpdateCacheDTO
    {
        public HandCards HandCards { get; set; }
        public Card Card { get; set; }
        public Deck Deck { get; set; }
        public int GameId { get; set; }
    }
}
