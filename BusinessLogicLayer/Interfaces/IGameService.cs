using EntitiesLayer.Entities;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.GameViewModels;
using ViewModelsLayer.ViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IGameService
    {
        Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request);
        Task<ResponseGameViewModel> CreateNewRound(int gameId);
        Task<ResponseGameViewModel> DealCards(int gameId);
        Task<ResponseGameViewModel> DealCardToPlayer(int gameId);
        Task<ResponseGameViewModel> DealCardToDealer(int gameId);
        Task<ResponseGameViewModel> DealCardToBots(int gameId);
    }
}
