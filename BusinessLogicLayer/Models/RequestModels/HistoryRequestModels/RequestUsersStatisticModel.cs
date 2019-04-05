using EntitiesLayer.Entities;
using System.Collections.Generic;

namespace BusinessLogicLayer.RequestModels.HistoryRequestModels
{
    public class RequestUsersStatisticModel
    {
        public IEnumerable<User> Users { get; set; } 
        public IEnumerable<UserRound> UserRounds { get; set; }
    }
}
