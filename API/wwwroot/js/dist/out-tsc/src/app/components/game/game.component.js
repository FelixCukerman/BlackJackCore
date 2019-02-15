import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GameService } from 'src/app/services/GameService/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/app/shared/enums/user-role';
var GameComponent = /** @class */ (function () {
    function GameComponent(service, router, currentRoute) {
        this.service = service;
        this.router = router;
        this.currentRoute = currentRoute;
    }
    GameComponent.prototype.InitializeUsers = function () {
        this.users = this.response.users.filter(function (user) { return user.userRole != UserRole.Dealer; });
        this.dealer = this.response.users.filter(function (user) { return user.userRole == UserRole.Dealer; }).shift();
        this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;
    };
    GameComponent.prototype.Show = function () {
        console.log(this.dealer.cards);
    };
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoad = false;
        this.service.GameById(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.service.DealCards(_this.currentRoute.snapshot.params['id']).subscribe(function (newdata) {
                _this.response = newdata;
                _this.InitializeUsers();
                _this.isLoad = true;
                console.log(_this.response);
            });
        });
    };
    GameComponent = tslib_1.__decorate([
        Component({
            selector: 'app-game',
            templateUrl: './game.component.html',
            styleUrls: ['./game.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [GameService, Router, ActivatedRoute])
    ], GameComponent);
    return GameComponent;
}());
export { GameComponent };
//# sourceMappingURL=game.component.js.map