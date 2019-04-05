using EntitiesLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicLayer.RequestModels.HistoryRequestModels
{
    public class RequestRoundDetailsModel
    {
        public IEnumerable<UserRound> UserRounds { get; set; }
        public Round Round { get; set; }
        public IEnumerable<User> Users { get; set; }
        public IEnumerable<Move> Moves { get; set; }
        public IEnumerable<Card> Cards { get; set; }
    }
}
