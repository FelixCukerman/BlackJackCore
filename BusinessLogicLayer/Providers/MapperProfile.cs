using AutoMapper;
using EntitiesLayer.Entities;
using ViewModelsLayer.ViewModels.CardViewModels;
using ViewModelsLayer.ViewModels.MoveViewModels;
using ViewModelsLayer.ViewModels.RoundViewModels;
using ViewModelsLayer.ViewModels.UserGameViewModels;
using ViewModelsLayer.ViewModels.UserRoundViewModels;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace BusinessLogicLayer.Providers
{
    public class MapperProfile : Profile
    {
        public MapperProfile() : base()
        {
            CreateMap<Card, ResponseCardViewModel>();

            CreateMap<Move, ResponseMoveViewModel>()
            .ForMember(x => x.Card, x => x.Ignore());

            CreateMap<User, ResponseUserViewModel>()
            .ForMember(x => x.Nickname, x => x.MapFrom(m => m.UserName))
            .ForMember(x => x.Cards, x => x.Ignore());

            CreateMap<Round, ResponseRoundViewModel>()
            .ForMember(x => x.RoundId, x => x.MapFrom(m => m.Id))
            .ForMember(x => x.IsOver, x => x.Ignore())
            .ForMember(x => x.UserRound, x => x.Ignore());

            CreateMap<UserRound, ResponseUserRoundViewModel>()
            .ForMember(x => x.Nickname, x => x.Ignore());

            CreateMap<UserGames, ResponseUserGameViewModel>();
        }
    }
}
