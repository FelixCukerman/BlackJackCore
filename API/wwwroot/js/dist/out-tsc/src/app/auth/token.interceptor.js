import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AccountService } from '../services/AccountService/account-service.service';
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(_auth) {
        this._auth = _auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this._auth.getToken()
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