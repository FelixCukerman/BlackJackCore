using EntitiesLayer.Entities;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.GameViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IGameService
    {
        Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request);
        Task<Round> CreateNewRound(int gameId);
        Task PlaceABet(int userId, int roundId, int rate);
        Task<ResponseGameViewModel> DealCards(int gameId);
        Task<ResponseGameViewModel> DealCardToPlayer(int gameId);
        Task<ResponseGameViewModel> DealCardToDealer(int gameId);
        Task<ResponseGameViewModel> DealCardToBots(int gameId);
    }
}
