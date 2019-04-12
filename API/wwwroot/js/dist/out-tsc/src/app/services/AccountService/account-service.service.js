import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { environment } from 'src/environments/environment';
var AccountService = /** @class */ (function () {
    function AccountService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.url = environment.authUrl;
    }
    AccountService.prototype.CreateToken = function (username) {
        var _this = this;
        this.http.get(this.url + "token/" + username).subscribe(function (data) {
            var token = data.accessToken;
            _this.storage.set('token', token);
        });
    };
    AccountService.prototype.GetToken = function () {
        var token = this.storage.get('token');
        return token;
    };
    AccountService.prototype.GetCurrentUsername = function () {
        var username = this.storage.get('username');
        return username;
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