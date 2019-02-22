using AutoMapper;
using EntitiesLayer.Entities;
using ViewModelsLayer.ViewModels.CardViewModels;
using ViewModelsLayer.ViewModels.GameViewModels;
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
            CreateMap<Card, ResponseCardViewModel>()
            .ForMember(x => x.CardName, x => x.MapFrom(m => m.CardName))
            .ForMember(x => x.CardValue, x => x.MapFrom(m => m.CardValue))
            .ForMember(x => x.Suit, x => x.MapFrom(m => m.Suit));

            CreateMap<Move, ResponseMoveViewModel>()
            .ForMember(x => x.User, x => x.MapFrom(m => m.User))
            .ForMember(x => x.Card, x => x.Ignore());

            CreateMap<User, ResponseUserViewModel>()
            .ForMember(x => x.Id, x => x.MapFrom(m => m.Id))
            .ForMember(x => x.Nickname, x => x.MapFrom(m => m.Nickname))
            .ForMember(x => x.UserRole, x => x.MapFrom(m => m.UserRole))
            .ForMember(x => x.Cards, x => x.Ignore())
            .ForMember(x => x.Cash, x => x.MapFrom(m => m.Cash));

            CreateMap<Round, ResponseRoundViewModel>()
            .ForMember(x => x.RoundId, x => x.MapFrom(m => m.Id))
            .ForMember(x => x.IsOver, x => x.Ignore())
            .ForMember(x => x.UserRound, x => x.Ignore());

            CreateMap<UserRound, ResponseUserRoundViewModel>()
            .ForMember(x => x.RoundStatus, x => x.MapFrom(m => m.RoundStatus))
            .ForMember(x => x.UserId, x => x.MapFrom(m => m.UserId))
            .ForMember(x => x.Nickname, x => x.Ignore())
            .ForMember(x => x.Points, x => x.MapFrom(m => m.Points));

            CreateMap<UserGames, ResponseUserGameViewModel>()
            .ForMember(x => x.UserId, x => x.MapFrom(m => m.UserId))
            .ForMember(x => x.GameId, x => x.MapFrom(m => m.GameId))
            .ForMember(x => x.Rate, x => x.MapFrom(m => m.Rate));
        }
    }
}
