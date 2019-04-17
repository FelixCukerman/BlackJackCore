import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var HistoryService = /** @class */ (function () {
    function HistoryService(_http, _handler) {
        this._http = _http;
        this._handler = _handler;
        this._url = environment.historyUrl;
        this._http = new HttpClient(this._handler);
    }
    HistoryService.prototype.getUsersForAutocomplete = function () {
        var result = this._http.get(this._url + "getpersons");
        return result;
    };
    HistoryService.prototype.getGamesByUser = function (userId) {
        var result = this._http.get(this._url + "gamesbyuser/" + userId);
        return result;
    };
    HistoryService.prototype.getGameDetails = function (gameId) {
        var result = this._http.get(this._url + "gamedetails/" + gameId);
        return result;
    };
    HistoryService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, HttpBackend])
    ], HistoryService);
    return HistoryService;
}());
export { HistoryService };
//# sourceMappingURL=history.service.js.map