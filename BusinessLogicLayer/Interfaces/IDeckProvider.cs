using BusinessLogicLayer.DTOs;

namespace BusinessLogicLayer.Interfaces
{
    public interface IDeckProvider
    {
        Deck Get(int gameId);
        void Add(Deck deck, int gameId);
        void Update(Deck deck, int gameId);
        void Delete(int gameId);
    }
}
