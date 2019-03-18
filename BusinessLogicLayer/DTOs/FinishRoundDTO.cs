using EntitiesLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ViewModelsLayer.ViewModels.GameViewModels;

namespace BusinessLogicLayer.DTOs
{
    public class FinishRoundDTO
    {
        public Round LastRound { get; set; }
        public List<Move> MovesToCreate { get; set; }
        public ResponseGameViewModel GameResult { get; set; }
    }
}
