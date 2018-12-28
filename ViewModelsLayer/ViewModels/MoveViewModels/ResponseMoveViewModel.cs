using ViewModelsLayer.ViewModels.CardViewModels;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace ViewModelsLayer.ViewModels.MoveViewModels
{
    public class ResponseMoveViewModel
    {
        public ResponseUserViewModel User { get; set; }
        public ResponseCardViewModel Card { get; set; }
    }
}
