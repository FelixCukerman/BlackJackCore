import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import RequestGameViewModel from 'src/app/viewmodels/GameViewModels/request-game-view-model';
import { RequestUserViewModel } from 'src/app/viewmodels/UserViewModels/request-user-view-model';
import { StartService } from 'src/app/services/StartService/start.service';
import { Router } from '@angular/router';
var StartComponent = /** @class */ (function () {
    function StartComponent(service, router) {
        this.service = service;
        this.router = router;
    }
    StartComponent.prototype.CreateNewGame = function () {
        var _this = this;
        this.request.user = this.user;
        this.service.CreateNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this.router.navigate(['game/' + data.id]);
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
        tslib_1.__metadata("design:paramtypes", [StartService, Router])
    ], StartComponent);
    return StartComponent;
}());
export { StartComponent };
//# sourceMappingURL=start.component.js.map