import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var HistoryService = /** @class */ (function () {
    function HistoryService(http) {
        this.http = http;
        this.url = "/api/history/";
    }
    HistoryService.prototype.GetUsersForAutocomplete = function () {
        var result = this.http.get(this.url + "getusers");
        return result;
    };
    HistoryService.prototype.GetRoundIdsByGame = function (gameId) {
        var result = this.http.get(this.url + "roundsbygameid/" + gameId);
        return result;
    };
    HistoryService.prototype.GetAllGameIdsByUser = function (userId) {
        var result = this.http.get(this.url + "allgamesbyuser/" + userId);
        return result;
    };
    HistoryService.prototype.GetHistoryUserRounds = function (request) {
        var result = this.http.post(this.url + "roundhistory", request);
        return result;
    };
    HistoryService.prototype.GetGameStatistic = function (gameId) {
        var result = this.http.get(this.url + "gamestatistic/" + gameId);
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