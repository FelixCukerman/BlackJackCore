using BusinessLogicLayer.DTOs;
using EntitiesLayer.Entities;

namespace BusinessLogicLayer.Models.RequestModels.GameRequestModels
{
    public class RequestUpdateCacheModel
    {
        public HandCards HandCards { get; set; }
        public Card Card { get; set; }
        public Deck Deck { get; set; }
        public int GameId { get; set; }
    }
}
