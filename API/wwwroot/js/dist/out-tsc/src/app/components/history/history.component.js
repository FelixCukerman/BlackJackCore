import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/HistoryService/history.service';
import RequestRoundHistoryViewModel from 'src/app/viewmodels/HistoryViewModels/request-round-history-view-model';
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(service) {
        this.service = service;
    }
    HistoryComponent.prototype.GetGameHistory = function (game) {
        var _this = this;
        for (var i = 0; i < game.roundsIds.length; i++) {
            var request = new RequestRoundHistoryViewModel(game.roundsIds[i], game.gameId);
            this.service.GetHistoryUserRounds(request).subscribe(function (data) {
                _this.roundResponse = data;
                _this.gameResponse.push(tslib_1.__assign({}, _this.roundResponse));
            });
        }
    };
    HistoryComponent.prototype.GetGamesByUser = function () {
        var _this = this;
        var person = this.users.filter(function (user) { return user.username == _this.username; }).shift();
        this.service.GetAllGameIdsByUser(person.id).subscribe(function (data) {
            _this.games = data;
            console.log(_this.games);
        });
    };
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.GetUsersForAutocomplete().subscribe(function (data) {
            _this.users = data;
        });
    };
    HistoryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-history',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HistoryService])
    ], HistoryComponent);
    return HistoryComponent;
}());
export { HistoryComponent };
//# sourceMappingURL=history.component.js.map