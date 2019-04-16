import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';
import { AccountService } from 'src/app/services/AccountService/account-service.service';
var StartComponent = /** @class */ (function () {
    function StartComponent(_storage, _startService, _router, _authService) {
        this._storage = _storage;
        this._startService = _startService;
        this._router = _router;
        this._authService = _authService;
    }
    StartComponent.prototype.ngOnInit = function () {
        this.user = new RequestUserViewModel("");
        this.request = new RequestGameViewModel(this.user, 0, 0, 0);
        this.tokenIsExist = false;
    };
    StartComponent.prototype.toHistory = function () {
        this._router.navigate(['game/history']);
    };
    StartComponent.prototype.createNewGame = function () {
        var _this = this;
        this._storage.set('username', this.user.Nickname);
        this.tokenIsExist = this.checkTokenExist();
        if (!this.tokenIsExist) {
            return;
        }
        this._startService.createNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this._router.navigate(['game/' + data.id]);
            _this.gameState = GameState.StartRound;
            _this._storage.set('key', _this.gameState);
        });
    };
    StartComponent.prototype.checkTokenExist = function () {
        var token = this._authService.getToken();
        var tokenIsMissing = token == null;
        if (tokenIsMissing) {
            this._authService.createToken(this.user.Nickname);
        }
        return tokenIsMissing;
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