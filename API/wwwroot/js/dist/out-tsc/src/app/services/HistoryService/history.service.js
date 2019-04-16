import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var HistoryService = /** @class */ (function () {
    function HistoryService(_http) {
        this._http = _http;
        this.url = environment.historyUrl;
    }
    HistoryService.prototype.getUsersForAutocomplete = function () {
        var result = this._http.get(this.url + "getpersons");
        return result;
    };
    HistoryService.prototype.getGamesByUser = function (userId) {
        var result = this._http.get(this.url + "gamesbyuser/" + userId);
        return result;
    };
    HistoryService.prototype.getGameDetails = function (gameId) {
        var result = this._http.get(this.url + "gamedetails/" + gameId);
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