using System;
using System.Collections.Generic;
using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using DataAccessLayer.Repositories;
using DataAccessLayer.Interfaces;
using BusinessLogicLayer.Providers;
using BusinessLogicLayer.DTOs;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;
using System.Linq;
using ViewModelsLayer.ViewModels.CardViewModels;
using ViewModelsLayer.ViewModels.GameViewModels;
using ViewModelsLayer.ViewModels;
using ViewModelsLayer.ViewModels.RoundViewModels;
using ViewModelsLayer.ViewModels.UserViewModels;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using DataAccessLayer.Repositories.DapperRepositories;
using DataAccessLayer;
using BusinessLogicLayer.Enums;
using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Enums;

namespace BusinessLogicLayer.Services
{
    public class GameService : IGameService
    {
        #region Fields
        private IGameRepository _gameRepository;
        private ICardRepository _cardRepository;
        private IRoundRepository _roundRepository;
        private IMoveRepository _moveRepository;
        private IUserGamesRepository _userGamesRepository;
        private IUserRepository _userRepository;
        private IUserRoundRepository _userRoundRepository;
        private IMapper _mapper;
        private DeckProvider _deckProvider;
        private HandCardsProvider _handCardsProvider;
        #endregion

        #region Constructor
        public GameService(IGameRepository gameRepository, ICardRepository cardRepository, IRoundRepository roundRepository, IMoveRepository moveRepository, IUserGamesRepository userGamesRepository, IUserRepository userRepository, IUserRoundRepository userRoundRepository, IMemoryCache cache, IMapper mapper)
        {
            _gameRepository = gameRepository;
            _cardRepository = cardRepository;
            _roundRepository = roundRepository;
            _moveRepository = moveRepository;
            _userGamesRepository = userGamesRepository;
            _userRepository = userRepository;
            _userRoundRepository = userRoundRepository;
            _mapper = mapper;
            _deckProvider = new DeckProvider(cache);
            _handCardsProvider = new HandCardsProvider(cache);
        }
        #endregion

        #region Private Method
        #region Reshuffle
        private List<Card> Reshuffle(List<Card> Deck)
        {
            Random rand = new Random();
            for (int i = Deck.Count - 1; i >= 1; i--)
            {
                int j = rand.Next(i + 1);
                Card tmp = Deck[j];
                Deck[j] = Deck[i];
                Deck[i] = tmp;
            }
            return Deck;
        }
        #endregion

        #region CheckDeck
        private Deck CheckDeck(Deck deck)
        {
            if (deck.Cards.Count < 15)
            {
                deck.Cards.AddRange(deck.DiscardPile);
                deck.DiscardPile.RemoveRange(0, deck.DiscardPile.Count);
                _deckProvider.Update(new Deck { Cards = deck.Cards, DiscardPile = deck.DiscardPile });
            }
            return deck;
        }
        #endregion

        #region IsBlackJack
        private async Task<bool> IsBlackJack(IEnumerable<Move> moves)
        {
            var cards = await _cardRepository.Get(moves);

            if (cards.Sum(x => x.CardValue) == 21)
            {
                return true;
            }
            return false;
        }
        #endregion

        #region IsBust
        private async Task<bool> IsBust(IEnumerable<Move> moves)
        {
            var cards = await _cardRepository.Get(moves);

            if (cards.Sum(x => x.CardValue) > 21)
            {
                return true;
            }
            return false;
        }
        #endregion

        #region IsMoreThan17Points
        private async Task<bool> IsMoreThan17Points(User user, int roundId)
        {
            var moves = await _moveRepository.Get(user.Id, roundId);
            var cards = await _cardRepository.Get(moves);
            var a = cards.Sum(x => x.CardValue);
            if (cards.Sum(x => x.CardValue) > 17)
            {
                return true;
            }
            return false;
        }
        #endregion

        #region CalculatePoints
        private async Task CalculatePoints(Round round)
        {
            var moves = await _moveRepository.Get(round);
            var userRounds = (await _userRoundRepository.Get(round)).Where(x => x.IsWin == null);
            var userGames = await _userGamesRepository.Get(round);
            var users = await _userRepository.Get(userGames);
            var userRoundsToUpdate = new List<UserRound>();
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);

            var dealerMoves = moves.Where(x => x.UserId == dealer.Id);
            var dealerCards = await _cardRepository.Get(dealerMoves);

            for (int i = 0; i < userRounds.Count(); i++)
            {
                var playerMoves = moves.Where(x => x.UserId == userRounds.ElementAt(i).UserId);
                var cards = await _cardRepository.Get(playerMoves);

                if (cards.Sum(x => x.CardValue) > dealerCards.Sum(x => x.CardValue))
                {
                    userRounds.FirstOrDefault(x => x.UserId == userRounds.ElementAt(i).UserId).IsWin = true;
                }
                if (cards.Sum(x => x.CardValue) < dealerCards.Sum(x => x.CardValue))
                {
                    userRounds.FirstOrDefault(x => x.UserId == userRounds.ElementAt(i).UserId).IsWin = false;
                }
                userRoundsToUpdate.Add(userRounds.FirstOrDefault(x => x.UserId == userRounds.ElementAt(i).UserId));
            }
            if (userRoundsToUpdate.Count != 0)
            {
                await _userRoundRepository.UpdateRange(userRoundsToUpdate);
            }
        }
        #endregion

        #region GameIsOver
        public async Task<bool> GameIsOver(Game game)
        {
            var rounds = await _roundRepository.Get(game);
            if (game.RoundQuantity == rounds.Count())
            {
                return true;
            }
            return false;
        }
        #endregion

        #region UserResponse
        private List<ResponseUserViewModel> UserResponse(IEnumerable<User> users)
        {
            var handCards = _handCardsProvider.Get(users);
            var result = new List<ResponseUserViewModel>();

            for(int i = 0; i < users.Count(); i++)
            {
                var currentCards = _mapper.Map<List<ResponseCardViewModel>>(handCards.FirstOrDefault(x => x.User.Nickname == users.ElementAt(i).Nickname).Cards);
                result.Add(new ResponseUserViewModel
                {
                    Cards = currentCards,
                    Nickname = users.ElementAt(i).Nickname,
                    UserRole = users.ElementAt(i).UserRole
                });
            }
            return result;
        }
        #endregion

        #region SetLoserMoves
        private async Task SetLoserMoves(IEnumerable<UserRound> userRounds)
        {
            List<UserRound> winers = new List<UserRound>();
            winers.AddRange(userRounds.Where(x => x.IsWin == true));
            List<UserRound> losersMove = userRounds.Except(winers).ToList();

            for (int i = 0; i < losersMove.Count; i++)
            {
                losersMove[i].IsWin = false;
            }
            await _userRoundRepository.UpdateRange(userRounds);
        }
        #endregion
        #endregion

        #region GameResponse
        public async Task<ResponseGameViewModel> GameResponse(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);

            return new ResponseGameViewModel
            {
                Id = gameId,
                Rounds = _mapper.Map<List<ResponseRoundViewModel>>(rounds),
                Users = _mapper.Map<List<ResponseUserViewModel>>(users),
                IsOver = false
            };
        }
        #endregion

        #region CreateNewGame
        public async Task<ResponseGameViewModel> CreateNewGame(RequestGameViewModel request)
        {
            var game = new Game();
            var cards = await _cardRepository.Get();
            cards = this.Reshuffle(cards.ToList());
            var userGames = new List<UserGames>();
            var bots = new List<User>();
            var peoplePlayer = await _userRepository.Get(request.User.Nickname);
            var dealer = await _userRepository.Get("Dealer");
            game.RoundQuantity = request.RoundQuantity;
            await _gameRepository.Create(game);

            if (request.BotQuantity >= 0 && request.BotQuantity <= 5)
            {
                for (int i = 0; i < request.BotQuantity; i++)
                {
                    var bot = new User { Nickname = "Bot#" + (i + 1), UserRole = UserRole.BotPlayer };
                    bots.Add(bot);
                    _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = bot });
                }
            }

            if (dealer != null && peoplePlayer != null)
            {
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = peoplePlayer });
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = dealer });
            }
            if (dealer == null)
            {
                dealer = new User { Nickname = "Dealer", UserRole = UserRole.Dealer };
                await _userRepository.Create(dealer);
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = dealer });
            }
            if (peoplePlayer == null)
            {
                peoplePlayer = new User { Nickname = request.User.Nickname, UserRole = UserRole.PeoplePlayer };
                await _userRepository.Create(peoplePlayer);
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = peoplePlayer });
            }

            await _userRepository.CreateRange(bots);

            for(int i = 0; i < bots.Count; i++)
            {
                userGames.Add(new UserGames { GameId = game.Id, UserId = bots[i].Id });
            }
            userGames.Add(new UserGames { GameId = game.Id, UserId = peoplePlayer.Id, Rate = request.UserRate });
            userGames.Add(new UserGames { GameId = game.Id, UserId = dealer.Id });

            await _userGamesRepository.CreateRange(userGames);
            _deckProvider.Add(new Deck { Cards = cards.ToList(), DiscardPile = new List<Card>() });
            await CreateNewRound(game.Id);

            ResponseGameViewModel result = await GameResponse(game.Id);
            return result;
        }
        #endregion

        #region CreateNewRound
        public async Task<ResponseGameViewModel> CreateNewRound(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var round = new Round { GameId = gameId };
            await _roundRepository.Create(round);
            var userGames = (await _userGamesRepository.Get(game));
            var users = (await _userRepository.Get(userGames)).Where(x => x.UserRole != UserRole.Dealer);
            var userRounds = new List<UserRound>();

            CheckDeck(deckFromCache);

            for (int i = 0; i < users.Count(); i++)
            {
                userRounds.Add(new UserRound { RoundId = round.Id, UserId = users.ElementAt(i).Id });
            }

            await _userRoundRepository.CreateRange(userRounds);
            return await GameResponse(gameId);
        }
        #endregion

        #region DealCards
        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            var result = await GameResponse(gameId);
            Deck deckFromCache = _deckProvider.Get();
            var handCardsToCache = new List<HandCards>();
            var cardToUser = new List<Card>();
            var move = new Move();
            var moves = new List<Move>();
            Game game = await _gameRepository.Get(gameId);
            List<UserGames> userGames = await _userGamesRepository.Get(game);
            List<User> users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            List<Round> rounds = await _roundRepository.Get(game);
            List<UserRound> userRounds = await _userRoundRepository.Get(users);

            for (int i = 0; i < users.Count(); i++)
            {
                if (users.ElementAt(i).UserRole != UserRole.Dealer && users.ElementAt(i).UserRole != UserRole.None)
                {
                    cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
                    handCardsToCache.Add(new HandCards { Cards = cardToUser, User = users.ElementAt(i) });
                    result.Users.FirstOrDefault(x => x.Nickname == users.ElementAt(i).Nickname).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);
                    deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);
                    move = new Move { RoundId = rounds.Last().Id, UserId = users.ElementAt(i).Id, CardId = cardToUser[0].Id };
                    moves.Add(move);
                    move = new Move { RoundId = rounds.Last().Id, UserId = users.ElementAt(i).Id, CardId = cardToUser[1].Id }; //fix this shit
                    moves.Add(move);
                }
                if (await IsBlackJack(moves) && users.ElementAt(i).UserRole != UserRole.Dealer)
                {
                    userRounds.FirstOrDefault(x => x.UserId == users.ElementAt(i).Id).IsWin = true;
                }
            }

            await _moveRepository.CreateRange(moves);
            moves.RemoveRange(0, moves.Count);
            cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
            handCardsToCache.Add(new HandCards { Cards = cardToUser, User = dealer });
            result.Users.FirstOrDefault(x => x.UserRole == UserRole.Dealer).Cards = _mapper.Map<List<ResponseCardViewModel>>(cardToUser);
            deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);
            move = new Move { RoundId = rounds.Last().Id, UserId = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer).Id, CardId = cardToUser[0].Id };
            await _moveRepository.Create(move);
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = new List<Card>() });
            _handCardsProvider.AddRange(handCardsToCache);

            if (await IsBlackJack(moves))
            {
                result.Rounds.Last().IsOver = true;
                await SetLoserMoves(userRounds);
            }

            return result;
        }
        #endregion

        #region DealCardToPlayer
        public async Task<ResponseGameViewModel> DealCardToPlayer(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var user = users.FirstOrDefault(x => x.UserRole == UserRole.PeoplePlayer);
            var handCardsFromCache = _handCardsProvider.Get(user);
            var userRounds = await _userRoundRepository.Get(user.Id, rounds.Last().Id);
            var result = await GameResponse(gameId);

            if (userRounds.IsWin != null)
            {
                result.Users = UserResponse(users);
                return result;
            }

            if (user.UserRole == UserRole.PeoplePlayer && user != null)
            {
                move = new Move { UserId = user.Id, RoundId = rounds.Last().Id, CardId = deckFromCache.Cards.Last().Id };
                handCardsFromCache.Cards.Add(deckFromCache.Cards.Last());
                _handCardsProvider.Update(handCardsFromCache);
                result.Users = UserResponse(users);
                await _moveRepository.Create(move);
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
            }

            if (await IsBust(await _moveRepository.Get(user.Id, rounds.Last().Id)))
            {
                userRounds.IsWin = false;
                await _userRoundRepository.Update(userRounds);
            }

            if (await IsBlackJack(await _moveRepository.Get(user.Id, rounds.Last().Id)))
            {
                result.Rounds.Last().IsOver = true;
                await CalculatePoints(rounds.Last());
            }

            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });
            return result;
        }
        #endregion

        #region DealCardToDealer
        public async Task<ResponseGameViewModel> DealCardToDealer(int gameId)
        {
            var game = await _gameRepository.Get(gameId);
            var deckFromCache = _deckProvider.Get();
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            var handCardsFromCache = _handCardsProvider.Get(dealer);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userRounds = await _userRoundRepository.Get(rounds.Last());
            var moves = (await _moveRepository.Get(dealer.Id, rounds.Last().Id)).ToList();
            var result = await GameResponse(gameId);

            if (await IsMoreThan17Points(dealer, rounds.Last().Id))
            {
                result.Rounds.Last().IsOver = true;
                await CalculatePoints(rounds.Last());
                result.Users = UserResponse(users);
                return result;
            }

            move = new Move { UserId = dealer.Id, RoundId = rounds.Last().Id, CardId = deckFromCache.Cards.Last().Id };
            await _moveRepository.Create(move);
            moves.Add(move);
            handCardsFromCache.Cards.Add(deckFromCache.Cards.Last());
            _handCardsProvider.Update(handCardsFromCache);
            result.Users = UserResponse(users);
            deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });
            await _gameRepository.Update(game);

            if(await IsBlackJack(moves)) 
            {
                await SetLoserMoves(userRounds);
            }

            result.IsOver = await GameIsOver(game);
            return result;
        }
        #endregion

        #region DealCardToBots
        public async Task<ResponseGameViewModel> DealCardToBots(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var userGames = await _userGamesRepository.Get(game);
            var users = await _userRepository.Get(userGames);
            var rounds = await _roundRepository.Get(game);
            var move = new Move();
            var userRounds = await _userRoundRepository.Get(rounds.Last());
            var bots = users.Where(x => x.UserRole == UserRole.BotPlayer);
            var moves = (await _moveRepository.Get(bots)).Where(x => x.RoundId == rounds.Last().Id).ToList();

            var handCardsFromCache = _handCardsProvider.Get(bots);
            var userRoundsToUpdate = new List<UserRound>();
            var movesToCreate = new List<Move>();

            for (int i = 0; i < bots.Count(); i++)
            {
                User item = bots.ElementAt(i);
                var currentUserRound = userRounds.FirstOrDefault(x => x.UserId == item.Id);

                if (userRounds.FirstOrDefault(x => x.UserId == item.Id).IsWin != null)
                {
                    continue;
                }
                if (new Random().Next(0, 2) == 0)
                {
                    continue;
                }

                move = new Move { RoundId = rounds.Last().Id, UserId = item.Id, CardId = deckFromCache.Cards.Last().Id };
                moves.Add(move);
                movesToCreate.Add(move);
                handCardsFromCache[i].Cards.Add(deckFromCache.Cards.Last());
                _handCardsProvider.Update(handCardsFromCache[i]);
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());

                if (await IsBust(moves.Where(x => x.UserId == item.Id)))
                {
                    currentUserRound.IsWin = false;
                    userRoundsToUpdate.Add(currentUserRound);
                }
                if (await IsBlackJack(moves.Where(x => x.UserId == item.Id)))
                {
                    currentUserRound.IsWin = true;
                    userRoundsToUpdate.Add(currentUserRound);
                }
            }

            var result = await GameResponse(gameId);
            result.Users = UserResponse(users);
            await _moveRepository.CreateRange(movesToCreate);
            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });

            return result;
        }
        #endregion
    }
}