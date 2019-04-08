using EntitiesLayer.Entities;
using System.Collections.Generic;
using ViewModelsLayer.ViewModels.GameViewModels;

namespace BusinessLogicLayer.Models.RequestModels.GameRequestModels
{
    public class RequestFinishRoundModel
    {
        public Round LastRound { get; set; }
        public List<Move> MovesToCreate { get; set; }
        public ResponseGameViewModel GameResult { get; set; }
    }
}
