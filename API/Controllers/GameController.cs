using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Interfaces;
using ViewModelsLayer.ViewModels.GameViewModels;
using System.Net;
using ViewModelsLayer.ViewModels.ReplenishCashViewModel;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameService _service { get; set; }
        private IFileLogger _logger { get; set; }

        public GameController(IGameService service, IFileLogger logger)
        {
            _service = service;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("gamebyid/{gameId}")]
        public async Task<IActionResult> GameById(int gameId)
        {
            try
            {
                var result = await _service.GetGameById(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpGet("gameover/{gameId}")]
        public async Task<IActionResult> GameOver(int gameId)
        {
            try
            {
                var result = await _service.GameOver(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [Authorize]
        [HttpPost("replenishcash")]
        public async Task<IActionResult> ReplenishCash([FromBody]RequestReplenishCashViewModel request)
        {
            try
            {
                var result = await _service.ReplenishCash(request);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }
        
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateNewGame(RequestGameViewModel request)
        {
            if(request.User.Nickname != User.Identity.Name)
            {
                return Unauthorized();
            }

            try
            {
                var result = await _service.CreateNewGame(request);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [Authorize]
        [HttpPost("createround/{gameId}")]
        public async Task<IActionResult> CreateNewRound(int gameId)
        {
            try
            {
                var result = await _service.CreateNewRound(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpPost("dealcards/{gameId}")]
        public async Task<IActionResult> DealCards(int gameId)
        {
            try
            {
                var result = await _service.DealCards(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpPost("dealcardstoplayer/{gameId}")]
        public async Task<IActionResult> DealCardsToPlayer(int gameId)
        {
            try
            {
                var result = await _service.DealCardToPlayer(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpPost("dealcardstobots/{gameId}")]
        public async Task<IActionResult> DealCardsToBots(int gameId)
        {
            try
            {
                var result = await _service.DealCardsToAllBots(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpPost("dealcardstodealer/{gameId}")]
        public async Task<IActionResult> DealCardsToDealer(int gameId)
        {
            try
            {
                var result = await _service.DealCardToDealer(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }
    }
}