import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/HistoryService/history.service';
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(service) {
        this.service = service;
    }
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