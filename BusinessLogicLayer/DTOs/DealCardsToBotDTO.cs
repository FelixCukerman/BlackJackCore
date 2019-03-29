using EntitiesLayer.Entities;
using System.Collections.Generic;

namespace BusinessLogicLayer.DTOs
{
    public class DealCardsToBotDTO
    {
        public int GameId { get; set; }
        public User Bot { get; set; }
        public List<Card> Cards { get; set; }
        public List<UserRound> UserRoundsToUpdate { get; set; }
        public UserRound UserRound { get; set; }
    }
}
