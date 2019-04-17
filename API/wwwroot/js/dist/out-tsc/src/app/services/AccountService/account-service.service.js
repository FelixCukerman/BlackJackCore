import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtConstant } from 'src/app/shared/constants/jwt-constants';
var peopleRole = 'People';
var tokenKey = 'token';
var AccountService = /** @class */ (function () {
    function AccountService(_http, _handler, _storage, _jwtHelper) {
        this._http = _http;
        this._handler = _handler;
        this._storage = _storage;
        this._jwtHelper = _jwtHelper;
        this._url = environment.authUrl;
        this._http = new HttpClient(this._handler);
    }
    //#region Public Methods
    AccountService.prototype.createToken = function (username) {
        var _this = this;
        this._http.get(this._url + "token/" + username).subscribe(function (data) {
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
    AccountService.prototype.checkAuthenticated = function () {
        var token = this._storage.get('token');
        var tokenExpired = this._jwtHelper.isTokenExpired(token);
        return !tokenExpired;
    };
    AccountService.prototype.checkUserRole = function () {
        try {
            var token = this._storage.get(tokenKey);
            var decodedToken = this._jwtHelper.decodeToken(token);
            var jwt = JSON.stringify(decodedToken);
            var parsedToken = JSON.parse(jwt);
            var isPeople = parsedToken[jwtConstant.userRole] == peopleRole;
            return isPeople;
        }
        catch (exception) {
            return false;
        }
    };
    AccountService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(2, Inject(LOCAL_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, HttpBackend, WebStorageService, JwtHelperService])
    ], AccountService);
    return AccountService;
}());
export { AccountService };
//# sourceMappingURL=account-service.service.js.map