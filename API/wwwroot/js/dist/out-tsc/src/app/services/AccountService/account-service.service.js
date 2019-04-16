import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { environment } from 'src/environments/environment';
var AccountService = /** @class */ (function () {
    function AccountService(_http, _storage) {
        this._http = _http;
        this._storage = _storage;
        this.url = environment.authUrl;
    }
    AccountService.prototype.createToken = function (username) {
        var _this = this;
        this._http.get(this.url + "token/" + username).subscribe(function (data) {
            var token = data.accessToken;
            _this._storage.set('token', token);
        });
    };
    AccountService.prototype.getToken = function () {
        var token = this._storage.get('token');
        return token;
    };
    AccountService.prototype.getCurrentUsername = function () {
        var username = this._storage.get('username');
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