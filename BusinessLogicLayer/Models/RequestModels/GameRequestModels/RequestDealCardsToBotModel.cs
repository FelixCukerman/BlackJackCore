using EntitiesLayer.Entities;
using System.Collections.Generic;

namespace BusinessLogicLayer.Models.RequestModels.GameRequestModels
{
    public class RequestDealCardsToBotModel
    {
        public int GameId { get; set; }
        public User Bot { get; set; }
        public List<Card> Cards { get; set; }
        public List<UserRound> UserRoundsToUpdate { get; set; }
        public UserRound UserRound { get; set; }
    }
}
