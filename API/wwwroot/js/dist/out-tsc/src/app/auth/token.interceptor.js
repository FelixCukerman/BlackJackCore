import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/AccountService/account-service.service';
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(_auth) {
        this._auth = _auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var token = this._auth.getToken();
        if (!token) {
            var username = this._auth.getCurrentUsername();
            this._auth.createToken(username);
            return Observable.create();
        }
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
        return next.handle(request);
    };
    TokenInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AccountService])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
export { TokenInterceptor };
//# sourceMappingURL=token.interceptor.js.map