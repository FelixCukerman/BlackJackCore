using System;
using System.Threading.Tasks;
using API.Interfaces;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/history")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private IHistoryService _service { get; set; }
        private IFileLogger _logger { get; set; }

        public HistoryController(IHistoryService service, IFileLogger logger)
        {
            _service = service;
            _logger = logger;
        }
        
        [HttpGet]
        [Route("gamedetails/{gameId}")]
        public async Task<IActionResult> GetGameDetails(int gameId)
        {
            var result = await _service.GetGameDetails(gameId);
            return new ObjectResult(result);
        }
        
        [HttpGet]
        [Route("getpersons")]
        public async Task<IActionResult> GetUsersForAutocomplete()
        {
            var result = await _service.GetUsersForAutocomplete();
            return new ObjectResult(result);
        }
        
        [HttpGet]
        [Route("gamesbyuser/{userId}")]
        public async Task<IActionResult> GetGamesByUser(int userId)
        {
            var result = await _service.GetGamesByUser(userId);
            return new ObjectResult(result);
        }
    }
}
