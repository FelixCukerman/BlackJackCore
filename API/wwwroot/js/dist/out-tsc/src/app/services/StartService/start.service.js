import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var StartService = /** @class */ (function () {
    function StartService(http) {
        this.http = http;
        this.url = environment.gameUrl;
    }
    StartService.prototype.CreateNewGame = function (request) {
        var result = this.http.post(this.url + "/create", request);
        return result;
    };
    StartService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], StartService);
    return StartService;
}());
export { StartService };
//# sourceMappingURL=start.service.js.map