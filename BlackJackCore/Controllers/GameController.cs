using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using DataAccessLayer.Repositories;
using DataAccessLayer;
using ViewModelsLayer.ViewModels.GameViewModels;

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

        [HttpPost("create")]
        public async Task<ResponseGameViewModel> CreateNewGame()
        {
            var user = new User { UserRole = UserRole.PeoplePlayer, Nickname = "ass228" };
            return await service.CreateNewGame(user, 3, 5);
        }

        [HttpPut("dealcards/{gameId}")]
        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            return await service.DealCards(gameId);
        }

        [HttpPut("dealcardstoplayer/{gameId}")]
        public async Task<ResponseGameViewModel> DealCardsToPlayer(int gameId)
        {
            return await service.DealCardToPlayer(gameId);
        }

        [HttpPut("dealcardstodealer/{gameId}")]
        public async Task<ResponseGameViewModel> DealCardsToDealer(int gameId)
        {
            return await service.DealCardToDealer(gameId);
        }

        // GET: api/Game/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Game
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Game/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
