using System;
using System.Net;
using System.Threading.Tasks;
using API.Inerfaces;
using API.Logger;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using ViewModelsLayer.ViewModels.HistoryViewModels;

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
        [Route("roundsbygameid/{gameId}")]
        public async Task<ObjectResult> GetRoundsByGameId(int gameId)
        {
            try
            {
                var result = await _service.GetRoundIdsByGame(gameId);
                return new ObjectResult(result);
            }
            catch(NullReferenceException ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpGet]
        [Route("allgamesbyuser/{userId}")]
        public async Task<ObjectResult> GetAllGameIdsByUser(int userId)
        {
            try
            {
                var result = await _service.GetAllGameIdsByUser(userId);
                return new ObjectResult(result);
            }
            catch (NullReferenceException ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpGet]
        [Route("historyuserrounds")]
        public async Task<ObjectResult> GetHistoryUserRounds([FromBody]RequestHistoryUserRoundViewModel request)
        {
            try
            {
                var result = await _service.GetHistoryUserRounds(request);
                return new ObjectResult(result);
            }
            catch (NullReferenceException ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpGet]
        [Route("usergamedetails/{gameId}")]
        public async Task<ObjectResult> GetHistoryUserDetails(int gameId)
        {
            try
            {
                var result = await _service.GetHistoryUserDetails(gameId);
                return new ObjectResult(result);
            }
            catch (NullReferenceException ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }
    }
}
