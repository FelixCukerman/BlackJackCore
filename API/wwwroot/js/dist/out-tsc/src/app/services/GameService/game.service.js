import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var GameService = /** @class */ (function () {
    function GameService(http) {
        this.http = http;
        this.url = environment.gameUrl;
    }
    GameService.prototype.GameById = function (id) {
        var result = this.http.get(this.url + "gamebyid/" + id);
        return result;
    };
    GameService.prototype.DealCards = function (id) {
        var result = this.http.post(this.url + "dealcards/" + id, id);
        return result;
    };
    GameService.prototype.DealCardToPlayer = function (id) {
        var result = this.http.post(this.url + "dealcardstoplayer/" + id, id);
        return result;
    };
    GameService.prototype.ReplenishCash = function (request) {
        var result = this.http.post(this.url + "replenishcash", request);
        return result;
    };
    GameService.prototype.DealCardsToBots = function (gameId) {
        var result = this.http.post(this.url + "dealcardstobots/" + gameId, gameId);
        return result;
    };
    GameService.prototype.DealCardsToDealer = function (id) {
        var result = this.http.post(this.url + "dealcardstodealer/" + id, id);
        return result;
    };
    GameService.prototype.CreateNewRound = function (id) {
        var result = this.http.post(this.url + "createround/" + id, id);
        return result;
    };
    GameService.prototype.GameOver = function (id) {
        var result = this.http.get(this.url + "gameover/" + id);
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