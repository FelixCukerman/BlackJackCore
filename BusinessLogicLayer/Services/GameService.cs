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
using ViewModelsLayer.ViewModels.MoveViewModels;
using ViewModelsLayer.ViewModels.RoundViewModels;
using ViewModelsLayer.ViewModels.UserViewModels;
using AutoMapper;

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
        private DeckProvider _deckProvider;
        private HandCardsProvider _handCardsProvider;
        #endregion

        #region Constructor
        public GameService(IGameRepository gameRepository, ICardRepository cardRepository, IRoundRepository roundRepository, IMoveRepository moveRepository, IUserGamesRepository userGamesRepository, IUserRepository userRepository, IUserRoundRepository userRoundRepository, IMemoryCache cache)
        {
            this._gameRepository = gameRepository;
            this._cardRepository = cardRepository;
            this._roundRepository = roundRepository;
            this._moveRepository = moveRepository;
            this._userGamesRepository = userGamesRepository;
            this._userRepository = userRepository;
            this._userRoundRepository = userRoundRepository;
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

        #region PutOutFromDiscardPileToDeck
        private void PutOutFromDiscardPileToDeck(Deck deck)
        {
            deck.Cards.AddRange(deck.DiscardPile);
            deck.DiscardPile.RemoveRange(0, deck.DiscardPile.Count);
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
            var cards = new List<Card>();
            for (int i = 0; i < moves.Count(); i++)
            {
                cards.Add(await _cardRepository.Get(moves.ElementAt(i).CardId));
            }
            if (cards.Sum(x => x.CardValue) == 21)
            {
                return true;
            }
            return false;
        }
        #endregion

        #region IsBust
        private async Task<bool> IsBust(User user, int roundId)
        {
            var moves = await _moveRepository.Get(x => x.UserId == user.Id && x.RoundId == roundId);
            var cards = await MovesToCards(moves);

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
            var moves = await _moveRepository.Get(x => x.UserId == user.Id && x.RoundId == roundId);
            var cards = await MovesToCards(moves);
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
            var moves = await _moveRepository.Get(x => x.RoundId == round.Id);
            var userRounds = await _userRoundRepository.Get(x => x.RoundId == round.Id && x.IsWin == null);
            var userGames = await _userGamesRepository.Get(x => x.GameId == round.GameId);
            var users = await UsergamesToUsers(userGames);
            var userRoundsToUpdate = new List<UserRound>();
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            var dealerCards = await MovesToCards(moves.Where(x => x.UserId == dealer.Id));

            for (int i = 0; i < userRounds.Count(); i++)
            {
                var cards = await MovesToCards(moves.Where(x => x.UserId == userRounds.ElementAt(i).UserId));
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

        #region RoundIsOver
        private async Task<bool> RoundIsOver(Game game)
        {
            var rounds = await _roundRepository.Get(x => x.GameId == game.Id);
            var moves = await _moveRepository.Get(x => x.Id == rounds.OrderBy(y => y.DateOfCreation).Last().Id);
            var userGames = await _userGamesRepository.Get(x => x.GameId == game.Id);
            var users = await UsergamesToUsers(userGames);
            var userRounds = await UsersToUserrounds(users);

            if (userRounds.Where(x => x.IsWin != null).Count() == users.Count())
            {
                return true;
            }
            return false;
        }
        #endregion

        #region GameIsOver
        public async Task<bool> GameIsOver(Game game)
        {
            var rounds = await _roundRepository.Get(x => x.GameId == game.Id);
            if (game.RoundQuantity == rounds.Count())
            {
                return true;
            }
            return false;
        }
        #endregion

        private async Task<ResponseGameViewModel> GameMapper(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var userGames = await _userGamesRepository.Get(x => x.GameId == gameId);
            var users = await UsergamesToUsers(userGames);
            var rounds = await _roundRepository.Get(x => x.GameId == gameId);

            return new ResponseGameViewModel
            {
                Deck = Mapper.Map<List<ResponseCardViewModel>>(deckFromCache.Cards),
                DiscardPile = Mapper.Map<List<ResponseCardViewModel>>(deckFromCache.DiscardPile),
                Rounds = Mapper.Map<List<ResponseRoundViewModel>>(rounds),
                Users = Mapper.Map<List<ResponseUserViewModel>>(users) //+карты на руках
            };
        }

        #region UsersToUserrounds
        private async Task<List<UserRound>> UsersToUserrounds(IEnumerable<User> users)
        {
            var userRounds = new List<UserRound>();
            for (int i = 0; i < users.Count(); i++)
            {
                var userRound = (await _userRoundRepository.Get(x => x.UserId == users.ElementAt(i).Id)).FirstOrDefault();
                userRounds.Add(userRound);
            }
            return userRounds;
        }
        #endregion

        #region UserRoundsToUsers
        private async Task<List<User>> UserRoundsToUsers(IEnumerable<UserRound> userRounds)
        {
            var users = new List<User>();
            for (int i = 0; i < userRounds.Count(); i++)
            {
                var user = (await _userRepository.Get(x => x.Id == userRounds.ElementAt(i).UserId)).FirstOrDefault();
                users.Add(user);
            }
            return users;
        }
        #endregion

        #region UsergamesToUsers
        private async Task<List<User>> UsergamesToUsers(IEnumerable<UserGames> userGames)
        {
            var users = new List<User>();
            if (userGames != null)
            {
                for (int i = 0; i < userGames.Count(); i++)
                {
                    users.Add(await _userRepository.Get((int)userGames.ElementAt(i).UserId));
                }
            }
            return users;

        }
        #endregion

        #region MovesToCards
        private async Task<List<Card>> MovesToCards(IEnumerable<Move> moves)
        {
            var cards = new List<Card>();
            if (moves != null)
            {
                for (int i = 0; i < moves.Count(); i++)
                {
                    cards.Add(await _cardRepository.Get((int)moves.ElementAt(i).CardId));
                }
            }
            return cards;
        }
        #endregion

        #region SetLoserMoves
        private async Task SetLoserMoves(List<UserRound> userRounds)
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

        #region SetCardsToUserFromCache
        private void SetCardsToUserFromCache(List<User> users)
        {
            for (int i = 0; i < users.Count; i++)
            {
                users[i].Cards = _handCardsProvider.Get(users[i]).Cards;
            }
        }
        #endregion
        #endregion

        #region CreateNewGame
        public async Task<ResponseGameViewModel> CreateNewGame(User user, int botQuantity, int roundQuantity)
        {
            var game = new Game();
            var cards = await _cardRepository.Get();
            cards = this.Reshuffle(cards.ToList());
            var userGames = new List<UserGames>();
            var users = new List<User>();
            game.RoundQuantity = roundQuantity;

            if (user.UserRole == UserRole.PeoplePlayer && user != null)
            {
                userGames.Add(new UserGames { Game = game, User = user });
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = user });
            }

            if (botQuantity >= 0 && botQuantity <= 5)
            {
                var dealer = new User { Nickname = "Dealer", UserRole = UserRole.Dealer };
                userGames.Add(new UserGames { Game = game, User = dealer });
                _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = dealer });
                for (int i = 0; i < botQuantity; i++)
                {
                    var bot = new User { Nickname = "Bot#" + (i + 1), UserRole = UserRole.BotPlayer };
                    userGames.Add(new UserGames { Game = game, User = bot });
                    _handCardsProvider.Add(new HandCards { Cards = new List<Card>(), User = bot });
                }
            }

            await _gameRepository.Create(game);
            await _userGamesRepository.CreateRange(userGames);
            _deckProvider.Add(new Deck { Cards = cards.ToList(), DiscardPile = new List<Card>() });
            await CreateNewRound(game.Id);

            for (int i = 0; i < userGames.Count; i++)
            {
                users.Add(await _userRepository.Get(userGames.ElementAt(i).User.Id));
            }

            ResponseGameViewModel result = await GameMapper(game.Id);
            //GameViewModel result = new GameViewModel
            //{
            //    Deck = Mapper.Map<List<CardViewModel>>(cards.ToList()),
            //    DiscardPile = new List<CardViewModel>(),
            //    IsOver = false,
            //    Rounds = Mapper.Map<List<RoundViewModel>>(await _roundRepository.Get(x => x.GameId == game.Id)),
            //    Users = Mapper.Map<List<UserViewModel>>(users)
            //};

            return result;

        }
        #endregion

        #region CreateNewRound
        public async Task<Round> CreateNewRound(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var game = await _gameRepository.Get(gameId);
            var round = new Round { Game = game };
            await _roundRepository.Create(round);
            var users = (await UsergamesToUsers(await _userGamesRepository.Get(x => x.GameId == gameId))).Where(x => x.UserRole != UserRole.Dealer);
            var userRounds = new List<UserRound>();

            if (deckFromCache.Cards.Count < 15)
            {
                PutOutFromDiscardPileToDeck(deckFromCache);
            }

            for (int i = 0; i < users.Count(); i++)
            {
                userRounds.Add(new UserRound { RoundId = round.Id, UserId = users.ElementAt(i).Id });
            }

            await _userRoundRepository.CreateRange(userRounds);

            return round;
        }
        #endregion

        #region PlaceABet
        public async Task PlaceABet(int userId, int roundId, int rate)
        {
            UserRound userRound = (await _userRoundRepository.Get(x => x.RoundId == roundId && x.UserId == userId)).FirstOrDefault();
            userRound.Rate = rate;
            await _userRoundRepository.Update(userRound);
        }
        #endregion

        #region DealCards
        public async Task<ResponseGameViewModel> DealCards(int gameId)
        {
            var result = await GameMapper(gameId);
            var deckFromCache = _deckProvider.Get();
            var cardToUser = new List<Card>();
            var move = new Move();
            var moves = new List<Move>();
            var users = await UsergamesToUsers(await _userGamesRepository.Get(x => x.GameId == gameId));
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            var rounds = await _roundRepository.Get(x => x.GameId == gameId);
            var userRounds = await UsersToUserrounds(users);

            for (int i = 0; i < users.Count(); i++)
            {
                if (users.ElementAt(i).UserRole != UserRole.Dealer && users.ElementAt(i).UserRole != UserRole.None)
                {
                    cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
                    deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);
                    move = new Move { RoundId = rounds.Last().Id, UserId = users.ElementAt(i).Id, CardId = cardToUser[0].Id };
                    moves.Add(move);
                    move = new Move { RoundId = rounds.Last().Id, UserId = users.ElementAt(i).Id, CardId = cardToUser[1].Id }; //fix this shit
                    moves.Add(move);
                }
                //if (await IsBlackJack(moves))
                //{
                //    userRounds.FirstOrDefault(x => x.UserId == users.ElementAt(i).Id && x.UserId != dealer.Id).IsWin = true;
                //}
            }

            await _moveRepository.CreateRange(moves);
            moves.RemoveRange(0, moves.Count);
            cardToUser = deckFromCache.Cards.Skip(deckFromCache.Cards.Count - 2).ToList();
            deckFromCache.Cards.RemoveRange(deckFromCache.Cards.Count - 2, 2);
            move = new Move { RoundId = rounds.Last().Id, UserId = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer).Id, CardId = cardToUser[0].Id };
            await _moveRepository.Create(move);
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = new List<Card>() });

            if (await IsBlackJack(moves))
            {
                result.IsOver = true;
                await SetLoserMoves(userRounds);
            }

            //result.Deck = Mapper.Map<List<CardViewModel>>(deckFromCache.Cards);
            //result.DiscardPile = Mapper.Map<List<CardViewModel>>(deckFromCache.DiscardPile);
            //result.Rounds = Mapper.Map<List<RoundViewModel>>(rounds);
            //result.Users = Mapper.Map<List<UserViewModel>>(users);

            return result;
        }
        #endregion

        #region DealCardToPlayer
        public async Task<ResponseGameViewModel> DealCardToPlayer(User user, int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var rounds = await _roundRepository.Get(x => x.GameId == gameId);
            var movesAtCurrentRound = await _moveRepository.Get(x => x.RoundId == rounds.Last().Id);
            var move = new Move();
            var userRounds = await _userRoundRepository.Get(x => x.UserId == user.Id && x.RoundId == rounds.Last().Id);
            var result = await GameMapper(gameId);

            if (userRounds.FirstOrDefault().IsWin != null)
            {
                return result;
            }

            if (user.UserRole == UserRole.PeoplePlayer && user != null)
            {
                move = new Move { UserId = user.Id, RoundId = rounds.Last().Id, CardId = deckFromCache.Cards.Last().Id };
                await _moveRepository.Create(move);
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());
            }

            if (await IsBust(user, rounds.Last().Id))
            {
                userRounds.FirstOrDefault().IsWin = false;
                await _userRoundRepository.Update(userRounds.FirstOrDefault());
            }

            if (await IsBlackJack(await _moveRepository.Get(x => x.RoundId == rounds.Last().Id && x.UserId == user.Id)))
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
            var userGames = await _userGamesRepository.Get(x => x.GameId == gameId);
            var users = await UsergamesToUsers(userGames);
            var dealer = users.FirstOrDefault(x => x.UserRole == UserRole.Dealer);
            var rounds = await _roundRepository.Get(x => x.GameId == gameId);
            var move = new Move();
            var userRound = (await _userRoundRepository.Get(x => x.UserId == dealer.Id && x.RoundId == rounds.Last().Id)).FirstOrDefault();
            var result = await GameMapper(gameId);

            //#region govno
            //var userRounds = await _userRoundRepository.Get(x => x.RoundId == rounds.Last().Id);
            //bool a = true;

            //SetCardsToUserFromCache(users);

            ////if (userRound.IsWin != null)
            ////{
            ////    return result;
            ////}

            //for (int i = 0; i < userRounds.Count(); i++)
            //{
            //    if (userRounds.ElementAt(i).IsWin != null)
            //    {
            //        a = false;
            //    }
            //}

            //if (a == false)
            //    return result;
            //#endregion

            if (await IsMoreThan17Points(dealer, rounds.Last().Id))
            {
                result.Rounds.Last().IsOver = true;
                await CalculatePoints(rounds.Last());
                return result;
            }


            move = new Move { UserId = dealer.Id, RoundId = rounds.Last().Id, CardId = deckFromCache.Cards.Last().Id };
            await _moveRepository.Create(move);
            deckFromCache.Cards.Remove(deckFromCache.Cards.Last());

            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });
            await _gameRepository.Update(game);

            //if (await IsBust(dealer, rounds.Last().Id))
            //{
            //    userRound.IsWin = false;
            //    await _userRoundRepository.Update(userRound);
            //}

            if (await GameIsOver(game))
            {
                result.Rounds.Last().IsOver = true;
                return result;
            }

            result.Deck = Mapper.Map<List<ResponseCardViewModel>>(deckFromCache.Cards);
            result.DiscardPile = Mapper.Map<List<ResponseCardViewModel>>(deckFromCache.DiscardPile);
            return result;
        }
        #endregion

        #region DealCardToBots
        public async Task<ResponseGameViewModel> DealCardToBots(int gameId)
        {
            var deckFromCache = _deckProvider.Get();
            var userGames = await _userGamesRepository.Get(x => x.GameId == gameId);
            var users = await UsergamesToUsers(userGames);
            var rounds = await _roundRepository.Get(x => x.GameId == gameId);
            var move = new Move();
            var userRounds = await _userRoundRepository.Get(x => x.RoundId == rounds.Last().Id);
            var bots = users.Where(x => x.UserRole == UserRole.BotPlayer);
            var userRoundsToUpdate = new List<UserRound>();

            for (int i = 0; i < bots.Count(); i++)
            {
                if (userRounds.FirstOrDefault(x => x.UserId == bots.ElementAt(i).Id).IsWin != null)
                {
                    continue;
                }

                if (new Random().Next(0, 2) == 0)
                {
                    continue;
                }

                User item = bots.ElementAt(i);
                move = new Move { RoundId = rounds.Last().Id, UserId = item.Id, CardId = deckFromCache.Cards.Last().Id };
                await _moveRepository.Create(move);
                deckFromCache.Cards.Remove(deckFromCache.Cards.Last());

                if (await IsBust(item, rounds.Last().Id))
                {
                    var busted = userRounds.FirstOrDefault(x => x.UserId == item.Id);
                    busted.IsWin = false;
                    userRoundsToUpdate.Add(busted);
                }
            }

            await _userRoundRepository.UpdateRange(userRoundsToUpdate);
            _deckProvider.Update(new Deck { Cards = deckFromCache.Cards, DiscardPile = deckFromCache.DiscardPile });

            var result = await GameMapper(gameId);
            //var result = new GameViewModel
            //{
            //    Deck = Mapper.Map<List<CardViewModel>>(deckFromCache.Cards),
            //    DiscardPile = Mapper.Map<List<CardViewModel>>(deckFromCache.DiscardPile),
            //    IsOver = false,
            //    Rounds = Mapper.Map<List<RoundViewModel>>(rounds),
            //    Users = Mapper.Map<List<UserViewModel>>(await UsergamesToUsers(await _userGamesRepository.Get(x => x.GameId == gameId)))
            //};

            return result;
        }
        #endregion
    }
}
