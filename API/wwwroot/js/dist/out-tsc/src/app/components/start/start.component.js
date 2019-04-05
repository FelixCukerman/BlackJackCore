import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { GameState } from 'src/app/shared/enums/game-state';
var StartComponent = /** @class */ (function () {
    function StartComponent(storage, startService, router) {
        this.storage = storage;
        this.startService = startService;
        this.router = router;
    }
    StartComponent.prototype.CreateNewGame = function () {
        var _this = this;
        this.storage.set('username', this.user.Nickname);
        this.startService.CreateNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this.router.navigate(['game/' + data.id]);
            _this.gameState = GameState.StartRound;
            _this.storage.set('key', _this.gameState);
        });
    };
    StartComponent.prototype.ngOnInit = function () {
        this.user = new RequestUserViewModel("");
        this.request = new RequestGameViewModel(this.user, 0, 0, 0);
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