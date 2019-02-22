import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { GameService } from 'src/app/services/GameService/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/shared/enums/user-role';
import { RequestReplenishCashViewModel } from 'src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model';
import { GameState } from 'src/app/shared/enums/game-state';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { RequestDealCardsToBotViewModel } from 'src/app/viewmodels/DealCardsToBotViewModel/request-deal-cards-to-bot-view-model';
var GameComponent = /** @class */ (function () {
    function GameComponent(storage, service, router, currentRoute) {
        this.storage = storage;
        this.service = service;
        this.router = router;
        this.currentRoute = currentRoute;
    }
    GameComponent.prototype.InitializeUsers = function () {
        this.users = this.response.users.filter(function (user) { return user.userRole != UserRole.Dealer; });
        this.dealer = this.response.users.filter(function (user) { return user.userRole == UserRole.Dealer; }).shift();
        this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;
        this.userGames = this.response.userGames;
        this.peopleplayer = this.users.filter(function (user) { return user.userRole == UserRole.PeoplePlayer; }).shift();
    };
    GameComponent.prototype.CreateNewRound = function () {
        var _this = this;
        this.service.CreateNewRound(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.DealCards();
        });
    };
    GameComponent.prototype.ReplenishCash = function () {
        var _this = this;
        this.requestReplenishCash.gameId = this.currentRoute.snapshot.params['id'];
        this.service.ReplenishCash(this.requestReplenishCash).subscribe(function (data) { _this.peopleplayer.cash = data; });
    };
    GameComponent.prototype.DealCardToPlayer = function () {
        var _this = this;
        this.gameProcess = "Your turn";
        this.storage.set('gameProcess', this.gameProcess);
        this.isLoad = false;
        this.service.DealCardToPlayer(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
            _this.isLoad = true;
        });
    };
    GameComponent.prototype.DealCardsToBots = function () {
        var _this = this;
        this.gameState = GameState.BotsMove;
        this.storage.set('key', this.gameState);
        this.gameProcess = "Bots draw cards";
        this.storage.set('gameProcess', this.gameProcess);
        var bots = this.response.users.filter(function (user) { return user.userRole == UserRole.BotPlayer; });
        for (var i = 0; i < bots.length; i++) {
            this.isLoad = false;
            this.requestDealCardsToBot.gameId = this.currentRoute.snapshot.params['id'];
            this.requestDealCardsToBot.userId = bots[i].id;
            this.service.DealCardsToBots(this.requestDealCardsToBot).subscribe(function (data) {
                _this.response = data;
                _this.InitializeUsers();
                _this.isLoad = true;
            });
        }
    };
    GameComponent.prototype.DealCardsToDealer = function () {
        var _this = this;
        this.gameState = GameState.DealerMove;
        this.storage.set('key', this.gameState);
        this.gameProcess = "Dealer draw cards";
        this.storage.set('gameProcess', this.gameProcess);
        this.isLoad = false;
        this.service.DealCardsToDealer(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
            _this.isLoad = true;
        });
    };
    GameComponent.prototype.SkipCard = function () {
        var _this = this;
        setTimeout(function () { _this.DealCardsToBots(); }, 4000);
        setTimeout(function () { _this.DealCardsToDealer(); }, 8000);
    };
    GameComponent.prototype.DealCards = function () {
        var _this = this;
        this.gameProcess = "New round";
        this.storage.set('gameProcess', this.gameProcess);
        this.gameState = GameState.PeopleMove;
        this.storage.set('key', this.gameState);
        this.service.DealCards(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
            _this.isLoad = true;
        });
    };
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameProcess = this.storage.get('gameProcess');
        this.requestReplenishCash = new RequestReplenishCashViewModel(0, 0);
        this.requestDealCardsToBot = new RequestDealCardsToBotViewModel(0, 0);
        this.gameState = this.storage.get('key');
        this.isLoad = false;
        this.service.GameById(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
            console.log(_this.response);
            _this.isLoad = true;
        });
    };
    GameComponent = tslib_1.__decorate([
        Component({
            selector: 'app-game',
            templateUrl: './game.component.html',
            styleUrls: ['./game.component.css']
        }),
        tslib_1.__param(0, Inject(LOCAL_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [WebStorageService, GameService, Router, ActivatedRoute])
    ], GameComponent);
    return GameComponent;
}());
export { GameComponent };
//# sourceMappingURL=game.component.js.map