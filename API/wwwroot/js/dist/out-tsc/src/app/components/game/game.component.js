import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { GameService } from 'src/app/services/GameService/game.service';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/shared/enums/user-role';
import { RequestReplenishCashViewModel } from 'src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model';
import { GameState } from 'src/app/shared/enums/game-state';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
var GameComponent = /** @class */ (function () {
    function GameComponent(_storage, _service, _currentRoute) {
        this._storage = _storage;
        this._service = _service;
        this._currentRoute = _currentRoute;
    }
    //#region ngCallbacks
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameProcess = this._storage.get('gameProcess');
        this.gameState = this._storage.get('key');
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
    //#endregion
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
        this.gameProcess = "Your turn";
        this._storage.set('gameProcess', this.gameProcess);
        this._service.dealCardToPlayer(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
        });
    };
    GameComponent.prototype.dealCardsToBots = function () {
        var _this = this;
        this.gameState = GameState.BotsMove;
        this._storage.set('key', this.gameState);
        this.gameProcess = "Bots draw cards";
        this._storage.set('gameProcess', this.gameProcess);
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
                this._storage.set('key', this.gameState);
                this.gameProcess = "Dealer draw cards";
                this._storage.set('gameProcess', this.gameProcess);
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
        this.gameProcess = "New round";
        this._storage.set('gameProcess', this.gameProcess);
        this.gameState = GameState.PeopleMove;
        this._storage.set('key', this.gameState);
        this._service.dealCards(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
        });
    };
    GameComponent.prototype.gameOver = function () {
        var _this = this;
        this.gameState = GameState.GameIsOver;
        this._storage.set('key', this.gameState);
        this.gameProcess = "Game is over";
        this._storage.set('gameProcess', this.gameProcess);
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