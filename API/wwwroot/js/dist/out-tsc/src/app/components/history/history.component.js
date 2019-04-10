import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/HistoryService/history.service';
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(service) {
        this.service = service;
    }
    HistoryComponent.prototype.GetGameDetails = function (gameId) {
        var _this = this;
        this.service.GetGameDetails(gameId).subscribe(function (data) {
            _this.response = data;
            console.log(_this.response);
            debugger;
        });
    };
    HistoryComponent.prototype.GetGamesByUser = function () {
        var _this = this;
        var user = this.users.filter(function (item) { return item.username == _this.username; }).shift();
        this.service.GetGamesByUser(user.id).subscribe(function (data) {
            _this.games = data;
            _this.isLoad = true;
        });
    };
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.GetUsersForAutocomplete().subscribe(function (data) {
            _this.users = data;
            _this.isLoad = false;
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