using BusinessLogicLayer.DTOs;
using EntitiesLayer.Entities;
using System.Collections.Generic;

namespace BusinessLogicLayer.Interfaces
{
    public interface IHandCardsProvider
    {
        HandCards Get(User user);
        List<HandCards> Get(IEnumerable<User> users);
        void Add(HandCards handCards);
        void AddRange(List<HandCards> handCards);
        void Update(HandCards handCards);
        void Delete(User user);
    }
}
