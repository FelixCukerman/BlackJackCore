using BusinessLogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.AccountViewModel;

namespace BusinessLogicLayer.Interfaces
{
    public interface IAccountService
    {
        Task<GetTokenViewModel> GetToken(string username);
    }
}
