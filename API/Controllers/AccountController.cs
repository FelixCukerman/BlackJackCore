using System.Threading.Tasks;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ViewModelsLayer.ViewModels.AccountViewModel;

namespace API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("token/{username}")]
        public async Task<GetTokenViewModel> GetToken(string username)
        {
            var result = await _service.GetToken(username);
            return result;
        }

        [HttpPost]
        [Route("createuser/{username}")]
        public async Task CreateUser(string username)
        {
            await _service.CreateUser(username);
        }
    }
}
