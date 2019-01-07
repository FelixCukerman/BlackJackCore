using AutoMapper;
using EntitiesLayer.Entities;
using ViewModelsLayer.ViewModels.CardViewModels;
using ViewModelsLayer.ViewModels.GameViewModels;
using ViewModelsLayer.ViewModels.MoveViewModels;
using ViewModelsLayer.ViewModels.RoundViewModels;
using ViewModelsLayer.ViewModels.UserViewModels;

namespace BusinessLogicLayer.Providers
{
    public class MapperProfile : Profile
    {
        public MapperProfile() : base()
        {
            CreateMap<Card, ResponseCardViewModel>()
            .ForMember(x => x.CardName, x => x.MapFrom(m => m.CardName))
            .ForMember(x => x.CardValue, x => x.MapFrom(m => m.CardValue))
            .ForMember(x => x.Suit, x => x.MapFrom(m => m.Suit));

            CreateMap<Move, ResponseMoveViewModel>()
            .ForMember(x => x.User, x => x.MapFrom(m => m.User))
            .ForMember(x => x.Card, x => x.Ignore());

            CreateMap<User, ResponseUserViewModel>()
            .ForMember(x => x.Nickname, x => x.MapFrom(m => m.Nickname))
            .ForMember(x => x.UserRole, x => x.MapFrom(m => m.UserRole))
            .ForMember(x => x.Cards, x => x.Ignore());

            CreateMap<Round, ResponseRoundViewModel>()
            .ForAllMembers(x => x.Ignore());
        }
    }
}
