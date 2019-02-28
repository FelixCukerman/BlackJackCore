using System.Collections.Generic;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.HistoryViewModels;

namespace BusinessLogicLayer.Interfaces
{
    public interface IHistoryService
    {
        Task<IEnumerable<int>> GetRoundIdsByGame(int gameId);
        Task<IEnumerable<int>> GetAllGameIdsByUser(int userId);
        Task<List<HistoryUserRoundViewModel>> GetHistoryUserRounds(RequestHistoryUserRoundViewModel request);
        Task<List<HistoryUserDetailsViewModel>> GetHistoryUserDetails(int gameId);
    }
}
