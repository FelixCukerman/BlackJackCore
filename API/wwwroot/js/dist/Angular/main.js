(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_start_start_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/start/start.module */ "./src/app/components/start/start.module.ts");
/* harmony import */ var _components_game_game_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/game/game.module */ "./src/app/components/game/game.module.ts");
/* harmony import */ var _components_history_history_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/history/history.module */ "./src/app/components/history/history.module.ts");
/* harmony import */ var _auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth/auth-guard.service */ "./src/app/auth/auth-guard.service.ts");
/* harmony import */ var _auth_user_role_guard_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth/user-role-guard.service */ "./src/app/auth/user-role-guard.service.ts");








var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'start'
    },
    {
        path: '',
        loadChildren: function () { return _components_start_start_module__WEBPACK_IMPORTED_MODULE_3__["StartModule"]; }
    },
    {
        path: '',
        loadChildren: function () { return _components_history_history_module__WEBPACK_IMPORTED_MODULE_5__["HistoryModule"]; }
    },
    {
        path: 'game',
        loadChildren: function () { return _components_game_game_module__WEBPACK_IMPORTED_MODULE_4__["GameModule"]; },
        canActivate: [_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"], _auth_user_role_guard_service__WEBPACK_IMPORTED_MODULE_7__["UserRoleGuard"]]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'BlackJack';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _auth_token_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth/token.interceptor */ "./src/app/auth/token.interceptor.ts");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");
/* harmony import */ var _auth_jwt_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/jwt.interceptor */ "./src/app/auth/jwt.interceptor.ts");
/* harmony import */ var _auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/auth-guard.service */ "./src/app/auth/auth-guard.service.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_11__["JwtModule"].forRoot({
                    config: {
                        tokenGetter: function tokenGetter() {
                            return localStorage.getItem('token');
                        }
                    }
                }),
                angular_webstorage_service__WEBPACK_IMPORTED_MODULE_8__["StorageServiceModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"].forRoot()
            ],
            providers: [
                _auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_10__["AuthGuard"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HTTP_INTERCEPTORS"],
                    useClass: _auth_token_interceptor__WEBPACK_IMPORTED_MODULE_7__["TokenInterceptor"],
                    multi: true
                },
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HTTP_INTERCEPTORS"],
                    useClass: _auth_jwt_interceptor__WEBPACK_IMPORTED_MODULE_9__["JwtInterceptor"],
                    multi: true
                },
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/auth-guard.service.ts":
/*!********************************************!*\
  !*** ./src/app/auth/auth-guard.service.ts ***!
  \********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/AccountService/account-service.service */ "./src/app/services/AccountService/account-service.service.ts");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
    }
    AuthGuard.prototype.canActivate = function () {
        var isAuthenticated = this._auth.checkAuthenticated();
        if (!isAuthenticated) {
            this._router.navigate(['start']);
        }
        return isAuthenticated;
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__["AccountService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/jwt.interceptor.ts":
/*!*****************************************!*\
  !*** ./src/app/auth/jwt.interceptor.ts ***!
  \*****************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_add_operator_do__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/add/operator/do */ "./node_modules/rxjs-compat/_esm5/add/operator/do.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/AccountService/account-service.service */ "./src/app/services/AccountService/account-service.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(_accountService) {
        this._accountService = _accountService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).do(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) { }
        }, function (error) {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpErrorResponse"]) {
                if (error.status === 401) {
                    var username = _this._accountService.getCurrentUsername();
                    _this._accountService.createToken(username);
                }
            }
        });
    };
    JwtInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__["AccountService"]])
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/auth/token.interceptor.ts":
/*!*******************************************!*\
  !*** ./src/app/auth/token.interceptor.ts ***!
  \*******************************************/
/*! exports provided: TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return TokenInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/AccountService/account-service.service */ "./src/app/services/AccountService/account-service.service.ts");




var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(_auth) {
        this._auth = _auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var token = this._auth.getToken();
        if (!token) {
            var username = this._auth.getCurrentUsername();
            this._auth.createToken(username);
            return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create();
        }
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
        return next.handle(request);
    };
    TokenInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__["AccountService"]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./src/app/auth/user-role-guard.service.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/user-role-guard.service.ts ***!
  \*************************************************/
/*! exports provided: UserRoleGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoleGuard", function() { return UserRoleGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/AccountService/account-service.service */ "./src/app/services/AccountService/account-service.service.ts");




var UserRoleGuard = /** @class */ (function () {
    function UserRoleGuard(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
    }
    UserRoleGuard.prototype.canActivate = function () {
        if (!this._auth.checkAuthenticated()) {
            this._router.navigate(['start']);
        }
        return this._auth.checkAuthenticated();
    };
    UserRoleGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_3__["AccountService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], UserRoleGuard);
    return UserRoleGuard;
}());



/***/ }),

/***/ "./src/app/components/game/game.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/game/game.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".startround {\r\n  min-height: 937px;\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.playerinfo {\r\n  height: 50px;\r\n  max-height: 50px;\r\n  width: 20%;\r\n  float: left;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  text-align: center;\r\n  color: aliceblue;\r\n}\r\n\r\n.dealernickname {\r\n  height: 50px;\r\n  max-height: 50px;\r\n  width: 100%;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  color: whitesmoke;\r\n  text-align: center;\r\n}\r\n\r\n.dealerarea {\r\n  width: 100%;\r\n  min-height: 190px;\r\n  padding-left: 40%;\r\n}\r\n\r\n.gamearea {\r\n  width: 100%;\r\n  height: 400px;\r\n  background-color: rgba(189,189,189, 0.05);\r\n  display: flex;\r\n}\r\n\r\n.playerpoints {\r\n  width: 20%;\r\n  background: unset;\r\n  background-color: rgba(238,238,238, 0.02);\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  color: white;\r\n  float: left;\r\n  display:inline-flex;\r\n}\r\n\r\n.nicknames {\r\n  padding-left: 20px;\r\n  padding-top: 24%;\r\n  width: 70%;\r\n  height: 400px;\r\n}\r\n\r\n.separator {\r\n  background-color: rgba(0, 0, 0, 0.48);\r\n  width: 10%;\r\n  height: 400px;\r\n}\r\n\r\n.points {\r\n  width: 20%;\r\n  padding-top: 24%;\r\n  height: 400px;\r\n}\r\n\r\n.gameprocess-block {\r\n  width: 58%;\r\n  height: 400px;\r\n  float: left;\r\n}\r\n\r\n.roundstate {\r\n  width: 100%;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 24pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n}\r\n\r\n.gameprocess {\r\n  width: 100%;\r\n  height: 350px;\r\n  text-align: center;\r\n  font-size: 54pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.gameprocess-animation {\r\n  width: 70%;\r\n  height: 150px;\r\n  color: aliceblue;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.roundstate {\r\n  width: 100%;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 24pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n}\r\n\r\n.peopleplayer-block {\r\n  width: 20%;\r\n  height: 400px;\r\n}\r\n\r\n.total-cash {\r\n  width: 100%;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 24pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n}\r\n\r\n.action-block {\r\n  width: 80%;\r\n  margin-top: 4px;\r\n  margin-left: 10%;\r\n  margin-right: 10%;\r\n  height: 153px;\r\n  padding-top: 3px;\r\n}\r\n\r\n.playerarea {\r\n  width: 100%;\r\n  min-height: 190px;\r\n}\r\n\r\n.cards {\r\n  float: left;\r\n  height: 190px;\r\n  display: flex;\r\n  width: 20%;\r\n  max-width: 20%;\r\n}\r\n\r\n.cards .card:hover {\r\n  z-index: 10;\r\n}\r\n\r\n.card {\r\n  width: 133px;\r\n  height: 186px;\r\n  background-size: cover;\r\n  margin-left: -105px;\r\n  background-color: transparent;\r\n  border-style: none;\r\n}\r\n\r\n.winners-area {\r\n  width: 50%;\r\n  height: 400px;\r\n  margin:auto;\r\n}\r\n\r\n.winner {\r\n  width: 50%;\r\n  min-height: 100px;\r\n  margin: auto;\r\n  margin-top: 40px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  text-align: center;\r\n  border-bottom: #ddd dashed 2px;\r\n  border-top: #ddd dashed 2px;\r\n  border-left: #ddd dashed 2px;\r\n  border-right: #ddd dashed 2px;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 26pt;\r\n  color: aliceblue;\r\n  background-color: rgba(189,189,189, 0.05);\r\n}\r\n\r\n.dotted-line-top {\r\n  border-top: #ddd dashed 2px;\r\n  margin-top: 5px;\r\n}\r\n\r\n.card:hover {\r\n  z-index: 10;\r\n  background-color: transparent;\r\n}\r\n\r\n.card:nth-child(1) {\r\n  z-index: 1;\r\n  margin-left: 0;\r\n}\r\n\r\n.card:nth-child(2) {\r\n  z-index: 2;\r\n}\r\n\r\n.card:nth-child(3) {\r\n  z-index: 3;\r\n}\r\n\r\n.card:nth-child(4) {\r\n  z-index: 4;\r\n}\r\n\r\n.card:nth-child(5) {\r\n  z-index: 5;\r\n}\r\n\r\n.card:nth-child(6) {\r\n  z-index: 6;\r\n}\r\n\r\n.card:nth-child(7) {\r\n  z-index: 7;\r\n}\r\n\r\n.card:nth-child(8) {\r\n  z-index: 8;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9nYW1lL2dhbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixXQUFXO0VBQ1gsNERBQTREO0VBQzVELGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsNERBQTREO0VBQzVELGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLHlDQUF5QztFQUN6QyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLHlDQUF5QztFQUN6Qyw0REFBNEQ7RUFDNUQsZUFBZTtFQUNmLFlBQVk7RUFDWixXQUFXO0VBQ1gsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBO0VBQ0UscUNBQXFDO0VBQ3JDLFVBQVU7RUFDVixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDREQUE0RDtFQUM1RCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsNERBQTREO0VBQzVELGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDREQUE0RDtFQUM1RCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUNBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDREQUE0RDtFQUM1RCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLGFBQWE7RUFDYixVQUFVO0VBQ1YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLDhCQUE4QjtFQUM5QiwyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLDZCQUE2QjtFQUM3Qiw0REFBNEQ7RUFDNUQsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQix5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZ2FtZS9nYW1lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3RhcnRyb3VuZCB7XHJcbiAgbWluLWhlaWdodDogOTM3cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ucGxheWVyaW5mbyB7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIG1heC1oZWlnaHQ6IDUwcHg7XHJcbiAgd2lkdGg6IDIwJTtcclxuICBmbG9hdDogbGVmdDtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxOHB0O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogYWxpY2VibHVlO1xyXG59XHJcblxyXG4uZGVhbGVybmlja25hbWUge1xyXG4gIGhlaWdodDogNTBweDtcclxuICBtYXgtaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE4cHQ7XHJcbiAgY29sb3I6IHdoaXRlc21va2U7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZGVhbGVyYXJlYSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogMTkwcHg7XHJcbiAgcGFkZGluZy1sZWZ0OiA0MCU7XHJcbn1cclxuXHJcbi5nYW1lYXJlYSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE4OSwxODksMTg5LCAwLjA1KTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4ucGxheWVycG9pbnRzIHtcclxuICB3aWR0aDogMjAlO1xyXG4gIGJhY2tncm91bmQ6IHVuc2V0O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjM4LDIzOCwyMzgsIDAuMDIpO1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE4cHQ7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG4gIGRpc3BsYXk6aW5saW5lLWZsZXg7XHJcbn1cclxuXHJcbi5uaWNrbmFtZXMge1xyXG4gIHBhZGRpbmctbGVmdDogMjBweDtcclxuICBwYWRkaW5nLXRvcDogMjQlO1xyXG4gIHdpZHRoOiA3MCU7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxufVxyXG5cclxuLnNlcGFyYXRvciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQ4KTtcclxuICB3aWR0aDogMTAlO1xyXG4gIGhlaWdodDogNDAwcHg7XHJcbn1cclxuXHJcbi5wb2ludHMge1xyXG4gIHdpZHRoOiAyMCU7XHJcbiAgcGFkZGluZy10b3A6IDI0JTtcclxuICBoZWlnaHQ6IDQwMHB4O1xyXG59XHJcblxyXG4uZ2FtZXByb2Nlc3MtYmxvY2sge1xyXG4gIHdpZHRoOiA1OCU7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxuICBmbG9hdDogbGVmdDtcclxufVxyXG5cclxuLnJvdW5kc3RhdGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyNHB0O1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBjb2xvcjogYWxpY2VibHVlO1xyXG59XHJcblxyXG4uZ2FtZXByb2Nlc3Mge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMzUwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogNTRwdDtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5nYW1lcHJvY2Vzcy1hbmltYXRpb24ge1xyXG4gIHdpZHRoOiA3MCU7XHJcbiAgaGVpZ2h0OiAxNTBweDtcclxuICBjb2xvcjogYWxpY2VibHVlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnJvdW5kc3RhdGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyNHB0O1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBjb2xvcjogYWxpY2VibHVlO1xyXG59XHJcblxyXG4ucGVvcGxlcGxheWVyLWJsb2NrIHtcclxuICB3aWR0aDogMjAlO1xyXG4gIGhlaWdodDogNDAwcHg7XHJcbn1cclxuLnRvdGFsLWNhc2gge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyNHB0O1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBjb2xvcjogYWxpY2VibHVlO1xyXG59XHJcblxyXG4uYWN0aW9uLWJsb2NrIHtcclxuICB3aWR0aDogODAlO1xyXG4gIG1hcmdpbi10b3A6IDRweDtcclxuICBtYXJnaW4tbGVmdDogMTAlO1xyXG4gIG1hcmdpbi1yaWdodDogMTAlO1xyXG4gIGhlaWdodDogMTUzcHg7XHJcbiAgcGFkZGluZy10b3A6IDNweDtcclxufVxyXG5cclxuLnBsYXllcmFyZWEge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1pbi1oZWlnaHQ6IDE5MHB4O1xyXG59XHJcblxyXG4uY2FyZHMge1xyXG4gIGZsb2F0OiBsZWZ0O1xyXG4gIGhlaWdodDogMTkwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICB3aWR0aDogMjAlO1xyXG4gIG1heC13aWR0aDogMjAlO1xyXG59XHJcblxyXG4uY2FyZHMgLmNhcmQ6aG92ZXIge1xyXG4gIHotaW5kZXg6IDEwO1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgd2lkdGg6IDEzM3B4O1xyXG4gIGhlaWdodDogMTg2cHg7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBtYXJnaW4tbGVmdDogLTEwNXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcclxufVxyXG5cclxuLndpbm5lcnMtYXJlYSB7XHJcbiAgd2lkdGg6IDUwJTtcclxuICBoZWlnaHQ6IDQwMHB4O1xyXG4gIG1hcmdpbjphdXRvO1xyXG59XHJcblxyXG4ud2lubmVyIHtcclxuICB3aWR0aDogNTAlO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBtYXJnaW4tdG9wOiA0MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyLWJvdHRvbTogI2RkZCBkYXNoZWQgMnB4O1xyXG4gIGJvcmRlci10b3A6ICNkZGQgZGFzaGVkIDJweDtcclxuICBib3JkZXItbGVmdDogI2RkZCBkYXNoZWQgMnB4O1xyXG4gIGJvcmRlci1yaWdodDogI2RkZCBkYXNoZWQgMnB4O1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDI2cHQ7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE4OSwxODksMTg5LCAwLjA1KTtcclxufVxyXG5cclxuLmRvdHRlZC1saW5lLXRvcCB7XHJcbiAgYm9yZGVyLXRvcDogI2RkZCBkYXNoZWQgMnB4O1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxufVxyXG5cclxuLmNhcmQ6aG92ZXIge1xyXG4gIHotaW5kZXg6IDEwO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG4uY2FyZDpudGgtY2hpbGQoMSkge1xyXG4gIHotaW5kZXg6IDE7XHJcbiAgbWFyZ2luLWxlZnQ6IDA7XHJcbn1cclxuXHJcbi5jYXJkOm50aC1jaGlsZCgyKSB7XHJcbiAgei1pbmRleDogMjtcclxufVxyXG5cclxuLmNhcmQ6bnRoLWNoaWxkKDMpIHtcclxuICB6LWluZGV4OiAzO1xyXG59XHJcblxyXG4uY2FyZDpudGgtY2hpbGQoNCkge1xyXG4gIHotaW5kZXg6IDQ7XHJcbn1cclxuXHJcbi5jYXJkOm50aC1jaGlsZCg1KSB7XHJcbiAgei1pbmRleDogNTtcclxufVxyXG5cclxuLmNhcmQ6bnRoLWNoaWxkKDYpIHtcclxuICB6LWluZGV4OiA2O1xyXG59XHJcblxyXG4uY2FyZDpudGgtY2hpbGQoNykge1xyXG4gIHotaW5kZXg6IDc7XHJcbn1cclxuXHJcbi5jYXJkOm50aC1jaGlsZCg4KSB7XHJcbiAgei1pbmRleDogODtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/game/game.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/game/game.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bg\">\r\n  <div class=\"startround\" *ngIf=\"this.gameState == 1\">\r\n    <button type=\"button\" class=\"btn btn-primary btn-lg\" style=\"width: 25%; height: 100px; font-size: 24pt\" (click)=\"dealCards()\">Start new round</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"(this.gameState == 2 || this.gameState == 3 || this.gameState == 4) && this.response\">\r\n    <div class=\"dealerarea\">\r\n      <div class=\"cards\">\r\n        <div class=\"card\" *ngFor=\"let usercard of dealer.cards\"><img src=\"images/cards/{{usercard.suit}}-{{usercard.cardName}}.png\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"dealernickname\">Dealer</div>\r\n    <div class=\"gamearea\">\r\n      <div class=\"playerpoints\">\r\n        <div class=\"nicknames\">\r\n          <div *ngFor=\"let userRound of userRounds\">{{userRound.nickname}}</div>\r\n        </div>\r\n        <div class=\"points\">\r\n          <div *ngFor=\"let userRound of userRounds\">{{userRound.points}}</div>\r\n        </div>\r\n        <div class=\"separator\"></div>\r\n      </div>\r\n      <div class=\"gameprocess-block\">\r\n        <div class=\"roundstate\">Round#{{this.response.rounds.length}}</div>\r\n        <div class=\"gameprocess\">\r\n          <div class=\"gameprocess-animation\">\r\n            {{this.gameProcess}}\r\n            <div class=\"spinner-grow\" style=\"width: 4rem; height: 4rem; margin-left: 3%; margin-top: 2%\" role=\"status\">\r\n              <span class=\"sr-only\">Loading...</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"separator\" style=\"width: 2%; background-color: rgba(0, 0, 0, 0.38)\"></div>\r\n      <div class=\"peopleplayer-block\">\r\n        <div class=\"total-cash\">Total cash: {{this.person.cash}}$</div>\r\n        <div class=\"action-block\">\r\n          <div *ngIf=\"this.gameState == 2\">\r\n            <button type=\"button\" class=\"btn btn-success btn-lg btn-block\" (click)=\"dealCardToPlayer()\">Take a card</button>\r\n            <button type=\"button\" class=\"btn btn-danger btn-lg btn-block\" (click)=\"skipCard()\">Skip a card</button>\r\n            <button type=\"button\" class=\"btn btn-info btn-lg btn-block\" data-toggle=\"modal\" data-target=\"#exampleModal\">Replenish a cash</button>\r\n          </div>\r\n          <div *ngIf=\"this.gameState == 3 || this.gameState == 4\">\r\n            <button type=\"button\" class=\"btn btn-success btn-lg btn-block disabled\" aria-disabled=\"true\">Take a card</button>\r\n            <button type=\"button\" class=\"btn btn-danger btn-lg btn-block disabled\" aria-disabled=\"true\">Skip a card</button>\r\n            <button type=\"button\" class=\"btn btn-info btn-lg btn-block\" data-toggle=\"modal\" data-target=\"#exampleModal\">Replenish a cash</button>\r\n          </div>\r\n          <div *ngIf=\"this.gameState == 4\">\r\n            <button type=\"button\" class=\"btn btn-info btn-lg btn-block\" (click)=\"createNewRound()\" style=\"margin-top: 3%\">New Round</button>\r\n          </div>\r\n          <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n            <div class=\"modal-dialog\" role=\"document\">\r\n              <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                  <h5 class=\"modal-title\" id=\"exampleModalLabel\">Replenish a cash</h5>\r\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                  </button>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                  <input type=\"number\" min=\"1\" class=\"form-control\" placeholder=\"cash\" aria-label=\"Username\" aria-describedby=\"basic-addon1\" [(ngModel)]=\"requestReplenishCash.cash\">\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                  <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"replenishCash()\">Send</button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"playerarea\">\r\n      <div class=\"cards\" *ngFor=\"let user of users\">\r\n        <div class=\"card\" *ngFor=\"let usercard of user.cards\"><img src=\"images/cards/{{usercard.suit}}-{{usercard.cardName}}.png\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"playerinfo\" *ngFor=\"let user of users\">{{user.nickname}}</div>\r\n  </div>\r\n  <div *ngIf=\"this.gameState == 5\">\r\n    <div class=\"row\" style=\"color:aliceblue; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 22pt; text-align:center; width: 100%\">\r\n      <div class=\"col-sm\" *ngFor=\"let user of this.responseGameOver\" style=\"border-right: #ddd dashed 1px;border-left: #ddd dashed 1px;\">\r\n        <div>{{user.username}}</div>\r\n        <div>{{user.winsQuantity}} wins</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"dotted-line-top\"></div>\r\n    <div style=\"font-size: 24pt; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align:center; color:aliceblue; margin-top: 20px;\">Winners: </div>\r\n    <div class=\"winners-area\">\r\n      <div *ngIf=\"this.winners\">\r\n        <div class=\"winner\" *ngFor=\"let user of winners\">{{user.username}}</div>\r\n      </div>\r\n      <div *ngIf=\"!this.winners\">\r\n        <div class=\"winner\">All players lose</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/game/game.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/game/game.component.ts ***!
  \***************************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_GameService_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/GameService/game.service */ "./src/app/services/GameService/game.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/enums/user-role */ "./src/app/shared/enums/user-role.ts");
/* harmony import */ var src_app_viewmodels_ReplenishCashViewModels_request_replenish_cash_view_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model */ "./src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model.ts");
/* harmony import */ var src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/enums/game-state */ "./src/app/shared/enums/game-state.ts");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");








var GameComponent = /** @class */ (function () {
    function GameComponent(_storage, _service, _currentRoute) {
        this._storage = _storage;
        this._service = _service;
        this._currentRoute = _currentRoute;
    }
    //#region ngCallbacks
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameProcess = this._storage.get('gameProcess');
        this.gameState = this._storage.get('key');
        this.requestReplenishCash = new src_app_viewmodels_ReplenishCashViewModels_request_replenish_cash_view_model__WEBPACK_IMPORTED_MODULE_5__["RequestReplenishCashViewModel"](0, 0);
        this.bots = new Array();
        this._service.gameById(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
            if (_this.response.isOver && _this.gameState == src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].GameIsOver) {
                _this.gameOver();
            }
        });
    };
    //#endregion
    //#region Public Methods
    GameComponent.prototype.createNewRound = function () {
        var _this = this;
        this._service.createNewRound(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.dealCards();
        });
    };
    GameComponent.prototype.replenishCash = function () {
        var _this = this;
        this.requestReplenishCash.userId = this.person.id;
        this._service.replenishCash(this.requestReplenishCash).subscribe(function (data) {
            _this.person.cash = data;
        });
    };
    GameComponent.prototype.dealCardToPlayer = function () {
        var _this = this;
        this.gameProcess = "Your turn";
        this._storage.set('gameProcess', this.gameProcess);
        this._service.dealCardToPlayer(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
        });
    };
    GameComponent.prototype.dealCardsToBots = function () {
        var _this = this;
        this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].BotsMove;
        this._storage.set('key', this.gameState);
        this.gameProcess = "Bots draw cards";
        this._storage.set('gameProcess', this.gameProcess);
        var gameId = this._currentRoute.snapshot.params['id'];
        this._service.dealCardsToBots(gameId).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
            setTimeout(function () {
                _this.dealCardsToDealer();
            }, 4000);
        });
    };
    GameComponent.prototype.dealCardsToDealer = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].DealerMove;
                this._storage.set('key', this.gameState);
                this.gameProcess = "Dealer draw cards";
                this._storage.set('gameProcess', this.gameProcess);
                this._service.dealCardsToDealer(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
                    _this.response = data;
                    _this.initializeUsers();
                    _this.gameIsOver = _this.response.isOver;
                    if (_this.gameIsOver) {
                        setTimeout(function () {
                            _this.gameOver();
                        }, 3000);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    GameComponent.prototype.skipCard = function () {
        var _this = this;
        setTimeout(function () {
            _this.dealCardsToBots();
        }, 4000);
    };
    //#endregion
    //#region Private Methods
    GameComponent.prototype.initializeUsers = function () {
        this.users = this.response.users.filter(function (user) { return user.userRole != src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].Dealer; });
        this.dealer = this.response.users.filter(function (user) { return user.userRole == src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].Dealer; }).shift();
        this.person = this.users.filter(function (user) { return user.userRole == src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].PeoplePlayer; }).shift();
        this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;
        this.userGames = this.response.userGames;
    };
    GameComponent.prototype.initializeWinners = function () {
        var firstWinner = this.responseGameOver.sort(function (item1, item2) { return item2.winsQuantity - item1.winsQuantity; })[0];
        if (firstWinner.winsQuantity != 0) {
            this.winners = this.responseGameOver.filter(function (user) { return user.winsQuantity == firstWinner.winsQuantity; });
        }
    };
    GameComponent.prototype.dealCards = function () {
        var _this = this;
        this.gameProcess = "New round";
        this._storage.set('gameProcess', this.gameProcess);
        this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].PeopleMove;
        this._storage.set('key', this.gameState);
        this._service.dealCards(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.initializeUsers();
        });
    };
    GameComponent.prototype.gameOver = function () {
        var _this = this;
        this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].GameIsOver;
        this._storage.set('key', this.gameState);
        this.gameProcess = "Game is over";
        this._storage.set('gameProcess', this.gameProcess);
        this._service.gameOver(this._currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.responseGameOver = data;
            _this.initializeWinners();
        });
    };
    GameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-game',
            template: __webpack_require__(/*! ./game.component.html */ "./src/app/components/game/game.component.html"),
            styles: [__webpack_require__(/*! ./game.component.css */ "./src/app/components/game/game.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(angular_webstorage_service__WEBPACK_IMPORTED_MODULE_7__["LOCAL_STORAGE"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angular_webstorage_service__WEBPACK_IMPORTED_MODULE_7__["WebStorageService"], src_app_services_GameService_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], GameComponent);
    return GameComponent;
}());



/***/ }),

/***/ "./src/app/components/game/game.module.ts":
/*!************************************************!*\
  !*** ./src/app/components/game/game.module.ts ***!
  \************************************************/
/*! exports provided: GameModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameModule", function() { return GameModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game/game.component */ "./src/app/components/game/game.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");







var routes = [
    {
        path: ':id',
        component: _game_game_component__WEBPACK_IMPORTED_MODULE_3__["GameComponent"]
    }
];
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_game_game_component__WEBPACK_IMPORTED_MODULE_3__["GameComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__["StorageServiceModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ]
        })
    ], GameModule);
    return GameModule;
}());



/***/ }),

/***/ "./src/app/components/history/history.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/history/history.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-autocomplete {\r\n  width: 300px;\r\n  height: 60px;\r\n  text-align: center;\r\n  font-size: 20pt;\r\n  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9oaXN0b3J5L2hpc3RvcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZiwyREFBMkQ7QUFDN0QiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2hpc3RvcnkvaGlzdG9yeS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXItYXV0b2NvbXBsZXRlIHtcclxuICB3aWR0aDogMzAwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IDIwcHQ7XHJcbiAgZm9udC1mYW1pbHk6J1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/history/history.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/history/history.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bg\" style=\"padding-top: 30px\">\r\n  <div style=\"display:flex; justify-content:center; align-items: center\">\r\n    <input type=\"text\" id=\"userIdFirstWay\" style=\"align-self: center\" list=\"users\" class=\"user-autocomplete\" [(ngModel)]=\"username\" />\r\n    <datalist id=\"users\">\r\n      <option *ngFor=\"let item of this.users\" [value]=\"item.username\"></option>\r\n    </datalist>\r\n\r\n    <button (click)=\"getGamesByUser()\" style=\"width:3%; height: 60px; background-image: url(images/icons/search.png); background-repeat: no-repeat\"></button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/history/history.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/history/history.component.ts ***!
  \*********************************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_HistoryService_history_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/HistoryService/history.service */ "./src/app/services/HistoryService/history.service.ts");



var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(_service) {
        this._service = _service;
        this.response = new Array();
    }
    //#region ngCallbacks
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getUsersForAutocomplete().subscribe(function (data) {
            _this.users = data;
        });
    };
    //#endregion
    //#region Public Methods
    HistoryComponent.prototype.getGameDetails = function (gameId) {
        var _this = this;
        this._service.getGameDetails(gameId).subscribe(function (data) {
            _this.response.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, data));
        });
    };
    HistoryComponent.prototype.getGamesByUser = function () {
        var _this = this;
        var user = this.users.filter(function (item) { return item.username == _this.username; }).shift();
        this._service.getGamesByUser(user.id).subscribe(function (data) {
            _this.games = data;
            for (var i = 0; i < _this.games.length; i++) {
                _this.getGameDetails(_this.games[i].gameId);
            }
        });
    };
    HistoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-history',
            template: __webpack_require__(/*! ./history.component.html */ "./src/app/components/history/history.component.html"),
            styles: [__webpack_require__(/*! ./history.component.css */ "./src/app/components/history/history.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_HistoryService_history_service__WEBPACK_IMPORTED_MODULE_2__["HistoryService"]])
    ], HistoryComponent);
    return HistoryComponent;
}());



/***/ }),

/***/ "./src/app/components/history/history.module.ts":
/*!******************************************************!*\
  !*** ./src/app/components/history/history.module.ts ***!
  \******************************************************/
/*! exports provided: HistoryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryModule", function() { return HistoryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../history/history.component */ "./src/app/components/history/history.component.ts");






var routes = [
    {
        path: 'history',
        component: _history_history_component__WEBPACK_IMPORTED_MODULE_5__["HistoryComponent"]
    }
];
var HistoryModule = /** @class */ (function () {
    function HistoryModule() {
    }
    HistoryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_history_history_component__WEBPACK_IMPORTED_MODULE_5__["HistoryComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ]
        })
    ], HistoryModule);
    return HistoryModule;
}());



/***/ }),

/***/ "./src/app/components/start/start.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/start/start.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  margin-top: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpbmUge1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/start/start.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/start/start.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bg\">\r\n  <div class=\"container\" style=\"padding-top: 15%\">\r\n    <div class=\"row\">\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\">\r\n        <div class=\"line\"></div>\r\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"user.nickname\" placeholder=\"Nickname\" />\r\n        <div class=\"line\"></div>\r\n        <input type=\"number\" value=\"\" min=\"1\" placeholder=\"Rate\" class=\"form-control\" [(ngModel)]=\"request.userRate\" />\r\n        <div class=\"line\"></div>\r\n        <input type=\"number\" value=\"\" min=\"1\" placeholder=\"Bot quantity\" class=\"form-control\" [(ngModel)]=\"request.botQuantity\" />\r\n        <div class=\"line\"></div>\r\n        <input type=\"number\" value=\"\" min=\"1\" placeholder=\"Round quantity\" class=\"form-control\" [(ngModel)]=\"request.roundQuantity\" />\r\n        <div class=\"line\"></div>\r\n        <button class=\"btn btn-primary\" (click)=\"createNewGame()\" style=\"width: 100%\">Create new game</button>\r\n        <button class=\"btn btn-primary\" (click)=\"toHistory()\" style=\"width: 100%; margin-top: 10px\">History</button>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n\r\n  <div *ngIf=\"this.tokenIsExist\" class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <h5 class=\"modal-title\" id=\"exampleModalLabel\">Modal title</h5>\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          ...\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/start/start.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/start/start.component.ts ***!
  \*****************************************************/
/*! exports provided: StartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartComponent", function() { return StartComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_viewmodels_GameViewModels_request_game_view_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/viewmodels/GameViewModels/request-game-view-model */ "./src/app/viewmodels/GameViewModels/request-game-view-model.ts");
/* harmony import */ var src_app_viewmodels_UserViewModels_request_user_view_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/viewmodels/UserViewModels/request-user-view-model */ "./src/app/viewmodels/UserViewModels/request-user-view-model.ts");
/* harmony import */ var src_app_services_StartService_start_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/StartService/start.service */ "./src/app/services/StartService/start.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");
/* harmony import */ var src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/enums/game-state */ "./src/app/shared/enums/game-state.ts");








var StartComponent = /** @class */ (function () {
    function StartComponent(_storage, _startService, _router) {
        this._storage = _storage;
        this._startService = _startService;
        this._router = _router;
    }
    //#region ngCallbacks
    StartComponent.prototype.ngOnInit = function () {
        this.user = new src_app_viewmodels_UserViewModels_request_user_view_model__WEBPACK_IMPORTED_MODULE_3__["RequestUserViewModel"]("");
        this.request = new src_app_viewmodels_GameViewModels_request_game_view_model__WEBPACK_IMPORTED_MODULE_2__["default"](this.user, 0, 0, 0);
    };
    //#endregion
    //#region Public Methods
    StartComponent.prototype.toHistory = function () {
        this._router.navigate(['history']);
    };
    StartComponent.prototype.createNewGame = function () {
        var _this = this;
        this._storage.set('username', this.user.nickname);
        this._startService.createNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this._router.navigate(['game/' + data.id]);
            _this._gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_7__["GameState"].StartRound;
            _this._storage.set('key', _this._gameState);
        });
    };
    StartComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-start',
            template: __webpack_require__(/*! ./start.component.html */ "./src/app/components/start/start.component.html"),
            styles: [__webpack_require__(/*! ./start.component.css */ "./src/app/components/start/start.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__["LOCAL_STORAGE"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__["WebStorageService"], src_app_services_StartService_start_service__WEBPACK_IMPORTED_MODULE_4__["StartService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], StartComponent);
    return StartComponent;
}());



/***/ }),

/***/ "./src/app/components/start/start.module.ts":
/*!**************************************************!*\
  !*** ./src/app/components/start/start.module.ts ***!
  \**************************************************/
/*! exports provided: StartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartModule", function() { return StartModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _start_start_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../start/start.component */ "./src/app/components/start/start.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../node_modules/@angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");







var routes = [
    {
        path: 'start',
        component: _start_start_component__WEBPACK_IMPORTED_MODULE_3__["StartComponent"]
    }
];
var StartModule = /** @class */ (function () {
    function StartModule() {
    }
    StartModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _start_start_component__WEBPACK_IMPORTED_MODULE_3__["StartComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__["StorageServiceModule"],
                _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ]
        })
    ], StartModule);
    return StartModule;
}());



/***/ }),

/***/ "./src/app/services/AccountService/account-service.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/services/AccountService/account-service.service.ts ***!
  \********************************************************************/
/*! exports provided: AccountService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountService", function() { return AccountService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");






var AccountService = /** @class */ (function () {
    function AccountService(_http, _handler, _storage, _jwtHelper) {
        this._http = _http;
        this._handler = _handler;
        this._storage = _storage;
        this._jwtHelper = _jwtHelper;
        this._url = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].authUrl;
        this._http = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"](this._handler);
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
            var token = this._storage.get('token');
            var decodedToken = this._jwtHelper.decodeToken(token);
            var isPeople = decodedToken.userRole == 'People';
            return isPeople;
        }
        catch (exception) {
            return false;
        }
    };
    AccountService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(angular_webstorage_service__WEBPACK_IMPORTED_MODULE_3__["LOCAL_STORAGE"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpBackend"], angular_webstorage_service__WEBPACK_IMPORTED_MODULE_3__["WebStorageService"], _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_5__["JwtHelperService"]])
    ], AccountService);
    return AccountService;
}());



/***/ }),

/***/ "./src/app/services/GameService/game.service.ts":
/*!******************************************************!*\
  !*** ./src/app/services/GameService/game.service.ts ***!
  \******************************************************/
/*! exports provided: GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");




var GameService = /** @class */ (function () {
    function GameService(_http) {
        this._http = _http;
        this._url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].gameUrl;
    }
    //#region Public Methods
    GameService.prototype.gameById = function (id) {
        var result = this._http.get(this._url + "gamebyid/" + id);
        return result;
    };
    GameService.prototype.dealCards = function (id) {
        var result = this._http.post(this._url + "dealcards/" + id, id);
        return result;
    };
    GameService.prototype.dealCardToPlayer = function (id) {
        var result = this._http.post(this._url + "dealcardstoplayer/" + id, id);
        return result;
    };
    GameService.prototype.replenishCash = function (request) {
        var result = this._http.post(this._url + "replenishcash", request);
        return result;
    };
    GameService.prototype.dealCardsToBots = function (gameId) {
        var result = this._http.post(this._url + "dealcardstobots/" + gameId, gameId);
        return result;
    };
    GameService.prototype.dealCardsToDealer = function (id) {
        var result = this._http.post(this._url + "dealcardstodealer/" + id, id);
        return result;
    };
    GameService.prototype.createNewRound = function (id) {
        var result = this._http.post(this._url + "createround/" + id, id);
        return result;
    };
    GameService.prototype.gameOver = function (id) {
        var result = this._http.get(this._url + "gameover/" + id);
        return result;
    };
    GameService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], GameService);
    return GameService;
}());



/***/ }),

/***/ "./src/app/services/HistoryService/history.service.ts":
/*!************************************************************!*\
  !*** ./src/app/services/HistoryService/history.service.ts ***!
  \************************************************************/
/*! exports provided: HistoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryService", function() { return HistoryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");




var HistoryService = /** @class */ (function () {
    function HistoryService(_http, _handler) {
        this._http = _http;
        this._handler = _handler;
        this._url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].historyUrl;
        this._http = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"](this._handler);
    }
    //#region Public Methods
    HistoryService.prototype.getUsersForAutocomplete = function () {
        var result = this._http.get(this._url + "getpersons");
        return result;
    };
    HistoryService.prototype.getGamesByUser = function (userId) {
        var result = this._http.get(this._url + "gamesbyuser/" + userId);
        return result;
    };
    HistoryService.prototype.getGameDetails = function (gameId) {
        var result = this._http.get(this._url + "gamedetails/" + gameId);
        return result;
    };
    HistoryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpBackend"]])
    ], HistoryService);
    return HistoryService;
}());



/***/ }),

/***/ "./src/app/services/StartService/start.service.ts":
/*!********************************************************!*\
  !*** ./src/app/services/StartService/start.service.ts ***!
  \********************************************************/
/*! exports provided: StartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartService", function() { return StartService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");




var StartService = /** @class */ (function () {
    function StartService(_http) {
        this._http = _http;
        this._url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].gameUrl;
    }
    StartService.prototype.createNewGame = function (request) {
        var result = this._http.post(this._url + "create", request);
        return result;
    };
    StartService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], StartService);
    return StartService;
}());



/***/ }),

/***/ "./src/app/shared/enums/game-state.ts":
/*!********************************************!*\
  !*** ./src/app/shared/enums/game-state.ts ***!
  \********************************************/
/*! exports provided: GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameState", function() { return GameState; });
var GameState;
(function (GameState) {
    GameState[GameState["None"] = 0] = "None";
    GameState[GameState["StartRound"] = 1] = "StartRound";
    GameState[GameState["PeopleMove"] = 2] = "PeopleMove";
    GameState[GameState["BotsMove"] = 3] = "BotsMove";
    GameState[GameState["DealerMove"] = 4] = "DealerMove";
    GameState[GameState["GameIsOver"] = 5] = "GameIsOver";
})(GameState || (GameState = {}));
;


/***/ }),

/***/ "./src/app/shared/enums/user-role.ts":
/*!*******************************************!*\
  !*** ./src/app/shared/enums/user-role.ts ***!
  \*******************************************/
/*! exports provided: UserRole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRole", function() { return UserRole; });
var UserRole;
(function (UserRole) {
    UserRole[UserRole["None"] = 0] = "None";
    UserRole[UserRole["BotPlayer"] = 1] = "BotPlayer";
    UserRole[UserRole["PeoplePlayer"] = 2] = "PeoplePlayer";
    UserRole[UserRole["Dealer"] = 3] = "Dealer";
})(UserRole || (UserRole = {}));
;


/***/ }),

/***/ "./src/app/viewmodels/GameViewModels/request-game-view-model.ts":
/*!**********************************************************************!*\
  !*** ./src/app/viewmodels/GameViewModels/request-game-view-model.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var RequestGameViewModel = /** @class */ (function () {
    function RequestGameViewModel(user, botQuantity, roundQuantity, userRate) {
        this.user = user;
        this.botQuantity = botQuantity;
        this.roundQuantity = roundQuantity;
        this.userRate = userRate;
    }
    return RequestGameViewModel;
}());
/* harmony default export */ __webpack_exports__["default"] = (RequestGameViewModel);


/***/ }),

/***/ "./src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/viewmodels/ReplenishCashViewModels/request-replenish-cash-view-model.ts ***!
  \*****************************************************************************************/
/*! exports provided: RequestReplenishCashViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestReplenishCashViewModel", function() { return RequestReplenishCashViewModel; });
var RequestReplenishCashViewModel = /** @class */ (function () {
    function RequestReplenishCashViewModel(userId, cash) {
        this.userId = userId;
        this.cash = cash;
    }
    return RequestReplenishCashViewModel;
}());



/***/ }),

/***/ "./src/app/viewmodels/UserViewModels/request-user-view-model.ts":
/*!**********************************************************************!*\
  !*** ./src/app/viewmodels/UserViewModels/request-user-view-model.ts ***!
  \**********************************************************************/
/*! exports provided: RequestUserViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestUserViewModel", function() { return RequestUserViewModel; });
var RequestUserViewModel = /** @class */ (function () {
    function RequestUserViewModel(nickname) {
        this.nickname = nickname;
    }
    return RequestUserViewModel;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: false,
    gameUrl: "/api/game/",
    historyUrl: "/api/history/",
    authUrl: "/api/auth/"
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Anuitex\source\repos\BlackJackCore\API\Angular\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map