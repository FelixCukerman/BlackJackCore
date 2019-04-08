using EntitiesLayer.Entities;
using System.Collections.Generic;

namespace BusinessLogicLayer.Models.RequestModels.GameRequestModels
{
    public class RequestDealTwoCardsModel
    {
        public List<Move> Moves { get; set; }
        public User User { get; set; }
        public int GameId { get; set; }
        public int RoundId { get; set; }
    }
}
