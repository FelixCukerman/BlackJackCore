import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var GameService = /** @class */ (function () {
    function GameService(http) {
        this.http = http;
        this.url = "/api/game";
    }
    GameService.prototype.GameById = function (id) {
        return this.http.get(this.url + "/gamebyid/" + id);
    };
    GameService.prototype.DealCards = function (id) {
        return this.http.post(this.url + "/dealcards/" + id, id);
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