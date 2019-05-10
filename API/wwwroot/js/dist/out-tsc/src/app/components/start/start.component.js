import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';
import { AccountService } from 'src/app/services/AccountService/account-service.service';
//#region Constants
var gameStateKey = 'key';
var usernameKey = 'username';
var historyPage = 'history';
//#endregion
var StartComponent = /** @class */ (function () {
    //#endregion
    function StartComponent(_storage, _startService, _router, _accountService) {
        this._storage = _storage;
        this._startService = _startService;
        this._router = _router;
        this._accountService = _accountService;
    }
    StartComponent.prototype.ngOnInit = function () {
        this.getUsersForAutocomplete();
        this.user = new RequestUserViewModel("");
        this.request = new RequestGameViewModel(this.user, 0, 0, 0);
    };
    //#region Public Methods
    StartComponent.prototype.toHistory = function () {
        console.log(this.user);
        this._router.navigate([historyPage]);
    };
    StartComponent.prototype.createNewGame = function () {
        var _this = this;
        var existingUser = this.getExistingUser();
        if (!existingUser) {
            this._accountService.createUser(this.user.nickname);
            return;
        }
        this._storage.set(usernameKey, this.user.nickname);
        this._startService.createNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this._router.navigate(['game/' + data.id]);
            _this._gameState = GameState.StartRound;
            _this._storage.set(gameStateKey, _this._gameState);
        });
    };
    StartComponent.prototype.getUsersForAutocomplete = function () {
        var _this = this;
        this._startService.getUsersForAutocomplete().subscribe(function (data) {
            _this.users = data;
        });
    };
    StartComponent.prototype.getExistingUser = function () {
        var _this = this;
        var existingUser = this.users.filter(function (item) { return item.username == _this.user.nickname; }).shift();
        return existingUser;
    };
    StartComponent = tslib_1.__decorate([
        Component({
            selector: 'app-start',
            templateUrl: './start.component.html',
            styleUrls: ['./start.component.css']
        }),
        tslib_1.__param(0, Inject(LOCAL_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [WebStorageService, StartService, Router, AccountService])
    ], StartComponent);
    return StartComponent;
}());
export { StartComponent };
//# sourceMappingURL=start.component.js.map