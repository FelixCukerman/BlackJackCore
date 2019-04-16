import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var GameService = /** @class */ (function () {
    function GameService(_http) {
        this._http = _http;
        this.url = environment.gameUrl;
    }
    GameService.prototype.gameById = function (id) {
        var result = this._http.get(this.url + "gamebyid/" + id);
        return result;
    };
    GameService.prototype.dealCards = function (id) {
        var result = this._http.post(this.url + "dealcards/" + id, id);
        return result;
    };
    GameService.prototype.dealCardToPlayer = function (id) {
        var result = this._http.post(this.url + "dealcardstoplayer/" + id, id);
        return result;
    };
    GameService.prototype.replenishCash = function (request) {
        var result = this._http.post(this.url + "replenishcash", request);
        return result;
    };
    GameService.prototype.dealCardsToBots = function (gameId) {
        var result = this._http.post(this.url + "dealcardstobots/" + gameId, gameId);
        return result;
    };
    GameService.prototype.dealCardsToDealer = function (id) {
        var result = this._http.post(this.url + "dealcardstodealer/" + id, id);
        return result;
    };
    GameService.prototype.createNewRound = function (id) {
        var result = this._http.post(this.url + "createround/" + id, id);
        return result;
    };
    GameService.prototype.gameOver = function (id) {
        var result = this._http.get(this.url + "gameover/" + id);
        return result;
    };
    GameService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GameService);
    return GameService;
}());
export { GameService };
//# sourceMappingURL=game.service.js.map