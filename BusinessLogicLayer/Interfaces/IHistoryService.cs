using System.Collections.Generic;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.HistoryViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IHistoryService
    {
        Task<ResponseGameDetailsViewModel> GetGameDetails(int gameId);
        Task<List<ResponseUserForAutocompleteView>> GetUsersForAutocomplete();
        Task<List<ResponseGamesByUserViewModel>> GetGamesByUser(int userId);
    }
}
