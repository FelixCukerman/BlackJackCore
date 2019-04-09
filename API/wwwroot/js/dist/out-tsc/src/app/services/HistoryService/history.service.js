import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var HistoryService = /** @class */ (function () {
    function HistoryService(http) {
        this.http = http;
        this.url = "/api/history/";
    }
    HistoryService.prototype.GetUsersForAutocomplete = function () {
        var result = this.http.get(this.url + "getpersons");
        return result;
    };
    HistoryService.prototype.GetGamesByUser = function (userId) {
        var result = this.http.get(this.url + "gamedetails/" + userId);
        return result;
    };
    HistoryService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HistoryService);
    return HistoryService;
}());
export { HistoryService };
//# sourceMappingURL=history.service.js.map