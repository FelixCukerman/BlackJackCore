import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';
var gameStateKey = 'key';
var usernameKey = 'username';
var StartComponent = /** @class */ (function () {
    //#endregion
    function StartComponent(_storage, _startService, _router) {
        this._storage = _storage;
        this._startService = _startService;
        this._router = _router;
    }
    //#region ngCallbacks
    StartComponent.prototype.ngOnInit = function () {
        this.user = new RequestUserViewModel("");
        this.request = new RequestGameViewModel(this.user, 0, 0, 0);
    };
    //#endregion
    //#region Public Methods
    StartComponent.prototype.toHistory = function () {
        this._router.navigate(['history']);
    };
    StartComponent.prototype.createNewGame = function () {
        var _this = this;
        this._storage.set(usernameKey, this.user.nickname);
        this._startService.createNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this._router.navigate(['game/' + data.id]);
            _this._gameState = GameState.StartRound;
            _this._storage.set(gameStateKey, _this._gameState);
        });
    };
    StartComponent = tslib_1.__decorate([
        Component({
            selector: 'app-start',
            templateUrl: './start.component.html',
            styleUrls: ['./start.component.css']
        }),
        tslib_1.__param(0, Inject(LOCAL_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [WebStorageService, StartService, Router])
    ], StartComponent);
    return StartComponent;
}());
export { StartComponent };
//# sourceMappingURL=start.component.js.map