import * as tslib_1 from "tslib";
import 'rxjs/add/operator/do';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '../services/AccountService/account-service.service';
import { Injectable } from '@angular/core';
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(_accountService) {
        this._accountService = _accountService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).do(function (event) {
            if (event instanceof HttpResponse) { }
        }, function (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    var username = _this._accountService.getCurrentUsername();
                    _this._accountService.createToken(username);
                }
            }
        });
    };
    JwtInterceptor = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AccountService])
    ], JwtInterceptor);
    return JwtInterceptor;
}());
export { JwtInterceptor };
//# sourceMappingURL=jwt.interceptor.js.map