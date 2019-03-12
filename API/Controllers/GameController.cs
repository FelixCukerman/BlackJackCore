using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Interfaces;
using ViewModelsLayer.ViewModels.GameViewModels;
using System.Net;
using ViewModelsLayer.ViewModels.ReplenishCashViewModel;
using API.Logger;

namespace API.Controllers
{
    [Route("api/game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameService _service { get; set; }

        public GameController(IGameService service)
        {
            this._service = service;
        }

        [HttpGet]
        [Route("gamebyid/{gameId}")]
        public async Task<ObjectResult> GameById(int gameId)
        {
            try
            {
                var result = await _service.GetGameById(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpGet]
        [Route("gameover/{gameId}")]
        public async Task<ObjectResult> GameOver(int gameId)
        {
            try
            {
                var result = await _service.GameOver(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpPost]
        [Route("replenishcash")]
        public async Task<ObjectResult> ReplenishCash([FromBody]RequestReplenishCashViewModel request)
        {
            try
            {
                var result = await _service.ReplenishCash(request);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<ObjectResult> CreateNewGame(RequestGameViewModel request)
        {
            try
            {
                var result = await _service.CreateNewGame(request); ;
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpPost]
        [Route("createround/{gameId}")]
        public async Task<ObjectResult> CreateNewRound(int gameId)
        {
            try
            {
                var result = await _service.CreateNewRound(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpPost("dealcards/{gameId}")]
        public async Task<ObjectResult> DealCards(int gameId)
        {
            try
            {
                var result = await _service.DealCards(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpPost("dealcardstoplayer/{gameId}")]
        public async Task<ObjectResult> DealCardsToPlayer(int gameId)
        {
            try
            {
                var result = await _service.DealCardToPlayer(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpPost("dealcardstobots/{gameId}")]
        public async Task<ObjectResult> DealCardsToBots(int gameId)
        {
            try
            {
                var result = await _service.DealCardsToAllBots(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpPost("dealcardstodealer/{gameId}")]
        public async Task<ObjectResult> DealCardsToDealer(int gameId)
        {
            try
            {
                var result = await _service.DealCardToDealer(gameId);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(ex.Message);
            }
        }
    }
}