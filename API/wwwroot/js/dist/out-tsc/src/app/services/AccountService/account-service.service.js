import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
var AccountService = /** @class */ (function () {
    function AccountService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.url = "/api/auth/";
    }
    AccountService.prototype.CreateToken = function (username) {
        var _this = this;
        var token;
        this.http.get(this.url + "token/" + username).subscribe(function (data) {
            token = data.accessToken;
            _this.storage.set('token', token);
        });
    };
    AccountService.prototype.GetToken = function () {
        return this.storage.get('token');
    };
    AccountService.prototype.GetCurrentUsername = function () {
        return this.storage.get('username');
    };
    AccountService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(LOCAL_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, WebStorageService])
    ], AccountService);
    return AccountService;
}());
export { AccountService };
//# sourceMappingURL=account-service.service.js.map