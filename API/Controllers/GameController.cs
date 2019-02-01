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

namespace API.Controllers
{
    [Route("api/game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameService service { get; set; }
        public GameController(IGameService service)
        {
            this.service = service;
        }

        [HttpGet]
        [Route("gamebyid/{gameId}")]
        public async Task<ResponseGameViewModel> GameById(int gameId)
        {
            return await service.GameResponse(gameId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request)
        {
            return await service.CreateNewGame(request);
        }

        [HttpPost]
        [Route("createround/{gameId}")]
        public async Task<ResponseGameViewModel> CreateNewRound(int gameId)
        {
            return await service.CreateNewRound(gameId);
        }

        [HttpPost("dealcards/{gameId}")]
        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            return await service.DealCards(gameId);
        }

        [HttpPost("dealcardstoplayer/{gameId}")]
        public async Task<ResponseGameViewModel> DealCardsToPlayer(int gameId)
        {
            return await service.DealCardToPlayer(gameId);
        }

        [HttpPost("dealcardstobots/{gameId}")]
        public async Task<ResponseGameViewModel> DealCardsToBots(int gameId)
        {
            return await service.DealCardToBots(gameId);
        }

        [HttpPost("dealcardstodealer/{gameId}")]
        public async Task<ResponseGameViewModel> DealCardsToDealer(int gameId)
        {
            return await service.DealCardToDealer(gameId);
        }
    }
}