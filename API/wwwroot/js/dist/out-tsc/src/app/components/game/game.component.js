import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { GameService } from 'src/app/services/GameService/game.service';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/shared/enums/user-role';
import { RequestReplenishCashViewModel } from 'src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model';
import { GameState } from 'src/app/shared/enums/game-state';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
//#region Constants
var gameStateKey = 'key';
var gameProcessKey = 'gameProcess';
var peopleTurn = "Your turn";
var botsTurn = "Bots draw cards";
var dealerTurn = "Dealer draw cards";
var newRound = "New round";
var gameOver = "Game is over";
//#endregion
var GameComponent = /** @class */ (function () {
    //#endregion
    function GameComponent(_storage, _service, _currentRoute) {
        this._storage = _storage;
        this._service = _service;
        this._currentRoute = _currentRoute;
    }
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameProcess = this._storage.get(gameProcessKey);
        this.gameState = this._storage.get(gameStateKey);
        this.requestReplenishCash = new RequestReplenishCashViewModel(0, 0);
        this.bots = new Array();
        this._service.gameById(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
            if (_this.response.isOver && _this.gameState == GameState.GameIsOver) {
                _this.gameOver();
            }
        });
    };
    //#region Public Methods
    GameComponent.prototype.createNewRound = function () {
        var _this = this;
        this._service.createNewRound(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.dealCards();
        });
    };
    GameComponent.prototype.replenishCash = function () {
        var _this = this;
        this.requestReplenishCash.userId = this.person.id;
        this._service.replenishCash(this.requestReplenishCash).subscribe(function (data) {
            _this.person.cash = data;
        });
    };
    GameComponent.prototype.dealCardToPlayer = function () {
        var _this = this;
        this.gameProcess = peopleTurn;
        this._storage.set(gameProcessKey, this.gameProcess);
        this._service.dealCardToPlayer(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
        });
    };
    GameComponent.prototype.dealCardsToBots = function () {
        var _this = this;
        this.gameState = GameState.BotsMove;
        this._storage.set(gameStateKey, this.gameState);
        this.gameProcess = botsTurn;
        this._storage.set(gameProcessKey, this.gameProcess);
        var gameId = this._currentRoute.snapshot.params['id'];
        this._service.dealCardsToBots(gameId).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
            setTimeout(function () {
                _this.dealCardsToDealer();
            }, 4000);
        });
    };
    GameComponent.prototype.dealCardsToDealer = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.gameState = GameState.DealerMove;
                this._storage.set(gameStateKey, this.gameState);
                this.gameProcess = dealerTurn;
                this._storage.set(gameProcessKey, this.gameProcess);
                this._service.dealCardsToDealer(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
                    _this.response = data;
                    _this.initializeUsers();
                    _this.gameIsOver = _this.response.isOver;
                    if (_this.gameIsOver) {
                        setTimeout(function () {
                            _this.gameOver();
                        }, 3000);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    GameComponent.prototype.skipCard = function () {
        var _this = this;
        setTimeout(function () {
            _this.dealCardsToBots();
        }, 4000);
    };
    //#endregion
    //#region Private Methods
    GameComponent.prototype.initializeUsers = function () {
        this.users = this.response.users.filter(function (user) { return user.userRole != UserRole.Dealer; });
        this.dealer = this.response.users.filter(function (user) { return user.userRole == UserRole.Dealer; }).shift();
        this.person = this.users.filter(function (user) { return user.userRole == UserRole.PeoplePlayer; }).shift();
        this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;
        this.userGames = this.response.userGames;
    };
    GameComponent.prototype.initializeWinners = function () {
        var firstWinner = this.responseGameOver.sort(function (item1, item2) { return item2.winsQuantity - item1.winsQuantity; })[0];
        if (firstWinner.winsQuantity != 0) {
            this.winners = this.responseGameOver.filter(function (user) { return user.winsQuantity == firstWinner.winsQuantity; });
        }
    };
    GameComponent.prototype.dealCards = function () {
        var _this = this;
        this.gameProcess = newRound;
        this._storage.set(gameProcessKey, this.gameProcess);
        this.gameState = GameState.PeopleMove;
        this._storage.set(gameStateKey, this.gameState);
        this._service.dealCards(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
        });
    };
    GameComponent.prototype.gameOver = function () {
        var _this = this;
        this.gameState = GameState.GameIsOver;
        this._storage.set(gameStateKey, this.gameState);
        this.gameProcess = gameOver;
        this._storage.set(gameProcessKey, this.gameProcess);
        this._service.gameOver(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.responseGameOver = data;
            _this.initializeWinners();
        });
    };
    GameComponent = tslib_1.__decorate([
        Component({
            selector: 'app-game',
            templateUrl: './game.component.html',
            styleUrls: ['./game.component.css']
        }),
        tslib_1.__param(0, Inject(LOCAL_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [WebStorageService, GameService, ActivatedRoute])
    ], GameComponent);
    return GameComponent;
}());
export { GameComponent };
//# sourceMappingURL=game.component.js.map