using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.AccountViewModel;

namespace BusinessLogicLayer.Interfaces
{
    public interface IAccountService
    {
        Task<GetTokenViewModel> GetToken(string username);
        Task CreateUser(string username);
    }
}
