import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/AccountService/account-service.service';
var startPage = 'start';
var UserRoleGuard = /** @class */ (function () {
    function UserRoleGuard(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
    }
    UserRoleGuard.prototype.canActivate = function () {
        var isPeople = this._auth.checkUserRole();
        if (!isPeople) {
            this._router.navigate([startPage]);
        }
        return isPeople;
    };
    UserRoleGuard = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AccountService, Router])
    ], UserRoleGuard);
    return UserRoleGuard;
}());
export { UserRoleGuard };
//# sourceMappingURL=user-role-guard.service.js.map