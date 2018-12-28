using EntitiesLayer.Entities;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.GameViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IGameService
    {
        Task<ResponseGameViewModel> CreateNewGame(User user, int botQuantity, int roundQuantity);
        Task<Round> CreateNewRound(int gameId);
        Task PlaceABet(int userId, int roundId, int rate);
        Task<ResponseGameViewModel> DealCards(int gameId);
        Task<ResponseGameViewModel> DealCardToPlayer(User user, int gameId);
        Task<ResponseGameViewModel> DealCardToDealer(int gameId);
        Task<ResponseGameViewModel> DealCardToBots(int gameId);
    }
}
