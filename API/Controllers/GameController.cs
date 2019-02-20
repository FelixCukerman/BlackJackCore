using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using ViewModelsLayer.ViewModels.GameViewModels;
using ViewModelsLayer.ViewModels;
using System.Net.Http;
using System.Net;
using ViewModelsLayer.ViewModels.DealCardsToBotViewModel;
using ViewModelsLayer.ViewModels.ReplenishCashViewModel;
using Microsoft.Extensions.Logging;
using API.Logger;
using System.IO;

namespace API.Controllers
{
    [Route("api/game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameService _service { get; set; }
        private ILoggerFactory _loggerFactory { get; set; }

        public GameController(IGameService service, ILoggerFactory loggerFactory)
        {
            this._service = service;
            this._loggerFactory = loggerFactory;
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
            catch(NullReferenceException ex)
            {
                FileLogger.LogError(ex);
                return new ObjectResult(StatusCode((int)HttpStatusCode.NotFound));
            }
        }

        [HttpPost]
        [Route("replenishcash")]
        public async Task<int> ReplenishCash([FromBody]RequestReplenishCashViewModel request)
        {
            return await _service.ReplenishCash(request);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request)
        {
            return await _service.CreateNewGame(request);
        }

        [HttpPost]
        [Route("createround/{gameId}")]
        public async Task<ResponseGameViewModel> CreateNewRound(int gameId)
        {
            return await _service.CreateNewRound(gameId);
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
        public async Task<ResponseGameViewModel> DealCardsToPlayer(int gameId)
        {
            return await _service.DealCardToPlayer(gameId);
        }

        [HttpPost("dealcardstobot")]
        public async Task<ResponseGameViewModel> DealCardsToBots(RequestDealCardsToBotViewModel request)
        {
            return await _service.DealCardsToBot(request);
        }

        [HttpPost("dealcardstodealer/{gameId}")]
        public async Task<ResponseGameViewModel> DealCardsToDealer(int gameId)
        {
            return await _service.DealCardToDealer(gameId);
        }
    }
}