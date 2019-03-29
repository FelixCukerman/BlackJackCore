using EntitiesLayer.Entities;
using System.Collections.Generic;

namespace DataAccessLayer.Interfaces
{
    public interface IDatabaseInitializer
    {
        List<User> GetUsers();
        List<Card> GetCards();
    }
}
