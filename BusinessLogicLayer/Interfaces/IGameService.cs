using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.GameViewModels;
using System.Collections.Generic;
using ViewModelsLayer.ViewModels.ReplenishCashViewModel;
using ViewModelsLayer.ViewModels.GameOverViewModel;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IGameService
    {
        Task<int> ReplenishCash(RequestReplenishCashViewModel request);
        Task<ResponseGameViewModel> GetGameById(int gameId);
        Task<List<ResponseGameOverViewModel>> GameOver(int gameId);
        Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request);
        Task<ResponseGameViewModel> CreateNewRound(int gameId);
        Task<ResponseGameViewModel> DealCards(int gameId);
        Task<ResponseGameViewModel> DealCardToPlayer(int gameId);
        Task<ResponseGameViewModel> DealCardToDealer(int gameId);
        Task<ResponseGameViewModel> DealCardsToAllBots(int gameId);
        Task<List<ResponseUserForAutocompleteViewItem>> GetUsersForAutocomplete();
    }
}
