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
/* harmony import */ var _modules_start_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/start.module */ "./src/app/modules/start.module.ts");
/* harmony import */ var _modules_game_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/game.module */ "./src/app/modules/game.module.ts");
/* harmony import */ var _modules_history_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/history.module */ "./src/app/modules/history.module.ts");






var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'game/start'
    },
    {
        path: 'game',
        loadChildren: function () { return _modules_start_module__WEBPACK_IMPORTED_MODULE_3__["StartModule"]; }
    },
    {
        path: 'game',
        loadChildren: function () { return _modules_history_module__WEBPACK_IMPORTED_MODULE_5__["HistoryModule"]; }
    },
    {
        path: 'game',
        loadChildren: function () { return _modules_game_module__WEBPACK_IMPORTED_MODULE_4__["GameModule"]; }
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
        this.title = 'Angular';
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










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                angular_webstorage_service__WEBPACK_IMPORTED_MODULE_8__["StorageServiceModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"].forRoot()
            ],
            providers: [
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
    function JwtInterceptor(accountService) {
        this.accountService = accountService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).do(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
            }
        }, function (error) {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpErrorResponse"]) {
                if (error.status === 401) {
                    var username = _this.accountService.GetCurrentUsername();
                    _this.accountService.CreateToken(username);
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
/* harmony import */ var _services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/AccountService/account-service.service */ "./src/app/services/AccountService/account-service.service.ts");



var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(auth) {
        this.auth = auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.auth.GetToken()
            }
        });
        return next.handle(request);
    };
    TokenInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_AccountService_account_service_service__WEBPACK_IMPORTED_MODULE_2__["AccountService"]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./src/app/components/game/game.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/game/game.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\nbody, html {\r\n  height: 100%;\r\n  margin: 0;\r\n}\r\n\r\n.line {\r\n  margin-top: 10px;\r\n}\r\n\r\n.bg {\r\n  background-image: url('/images/background/mainbackground.jpg');\r\n  min-height: 937px;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n}\r\n\r\n.startround {\r\n  min-height: 937px;\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.playerinfo {\r\n  height: 50px;\r\n  max-height: 50px;\r\n  width: 20%;\r\n  float: left;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  text-align: center;\r\n  color: aliceblue;\r\n}\r\n\r\n.dealernickname {\r\n  height: 50px;\r\n  max-height: 50px;\r\n  width: 100%;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  color: whitesmoke;\r\n  text-align: center;\r\n}\r\n\r\n.dealerarea {\r\n  width: 100%;\r\n  min-height: 190px;\r\n  padding-left: 40%;\r\n}\r\n\r\n.gamearea {\r\n  width: 100%;\r\n  height: 400px;\r\n  background-color: rgba(189,189,189, 0.05);\r\n  display: flex;\r\n}\r\n\r\n.playerpoints {\r\n  width: 20%;\r\n  background: unset;\r\n  background-color: rgba(238,238,238, 0.02);\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  color: white;\r\n  float: left;\r\n  display:inline-flex;\r\n}\r\n\r\n.nicknames {\r\n  padding-left: 20px;\r\n  padding-top: 24%;\r\n  width: 70%;\r\n  height: 400px;\r\n}\r\n\r\n.separator {\r\n  background-color: rgba(0, 0, 0, 0.48);\r\n  width: 10%;\r\n  height: 400px;\r\n}\r\n\r\n.points {\r\n  width: 20%;\r\n  padding-top: 24%;\r\n  height: 400px;\r\n}\r\n\r\n.gameprocess-block {\r\n  width: 58%;\r\n  height: 400px;\r\n  float: left;\r\n}\r\n\r\n.roundstate {\r\n  width: 100%;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 24pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n}\r\n\r\n.gameprocess {\r\n  width: 100%;\r\n  height: 350px;\r\n  text-align: center;\r\n  font-size: 54pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.gameprocess-animation {\r\n  width: 70%;\r\n  height: 150px;\r\n  color: aliceblue;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.roundstate {\r\n  width: 100%;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 24pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n}\r\n\r\n.peopleplayer-block {\r\n  width: 20%;\r\n  height: 400px;\r\n}\r\n\r\n.total-cash {\r\n  width: 100%;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 24pt;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  color: aliceblue;\r\n}\r\n\r\n.action-block {\r\n  width: 80%;\r\n  margin-top: 4px;\r\n  margin-left: 10%;\r\n  margin-right: 10%;\r\n  height: 153px;\r\n  padding-top: 3px;\r\n}\r\n\r\n.playerarea {\r\n  width: 100%;\r\n  min-height: 190px;\r\n}\r\n\r\n.cards {\r\n  float: left;\r\n  height: 190px;\r\n  display: flex;\r\n  width: 20%;\r\n  max-width: 20%;\r\n}\r\n\r\n.cards .card:hover {\r\n    z-index: 10;\r\n  }\r\n\r\n.card {\r\n  width: 133px;\r\n  height: 186px;\r\n  background-size: cover;\r\n  margin-left: -105px;\r\n  background-color: transparent;\r\n  border-style: none;\r\n}\r\n\r\n.gameover-item {\r\n  width: 60%;\r\n  min-height: 70px;\r\n  max-height: 200px;\r\n  background-color: aqua;\r\n  margin: auto;\r\n  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 26pt;\r\n  color: aliceblue;\r\n}\r\n\r\n.winners-area {\r\n  width: 50%;\r\n  height: 400px;\r\n  margin:auto;\r\n}\r\n\r\n.winner {\r\n  width: 50%;\r\n  min-height: 100px;\r\n  margin: auto;\r\n  margin-top: 40px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  text-align: center;\r\n  border-bottom: #ddd dashed 2px;\r\n  border-top: #ddd dashed 2px;\r\n  border-left: #ddd dashed 2px;\r\n  border-right: #ddd dashed 2px;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 26pt;\r\n  color: aliceblue;\r\n  background-color: rgba(189,189,189, 0.05);\r\n}\r\n\r\n.dotted-line-top {\r\n  border-top: #ddd dashed 2px;\r\n  margin-top: 5px;\r\n}\r\n\r\n.gameover-item-nickname {\r\n  margin-left: 40%;\r\n}\r\n\r\n.gameover-item-wins {\r\n  margin-left: 40%;\r\n}\r\n\r\n.card:hover {\r\n    z-index: 10;\r\n    background-color: transparent;\r\n  }\r\n\r\n.card:nth-child(1) {\r\n    z-index: 1;\r\n    margin-left: 0;\r\n  }\r\n\r\n.card:nth-child(2) {\r\n    z-index: 2;\r\n  }\r\n\r\n.card:nth-child(3) {\r\n    z-index: 3;\r\n  }\r\n\r\n.card:nth-child(4) {\r\n    z-index: 4;\r\n  }\r\n\r\n.card:nth-child(5) {\r\n    z-index: 5;\r\n  }\r\n\r\n.card:nth-child(6) {\r\n    z-index: 6;\r\n  }\r\n\r\n.card:nth-child(7) {\r\n    z-index: 7;\r\n  }\r\n\r\n.card:nth-child(8) {\r\n    z-index: 8;\r\n  }\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9nYW1lL2dhbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxZQUFZO0VBQ1osU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsOERBQTZEO0VBQzdELGlCQUFpQjtFQUNqQiwyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixXQUFXO0VBQ1gsNERBQTREO0VBQzVELGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsNERBQTREO0VBQzVELGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLHlDQUF5QztFQUN6QyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLHlDQUF5QztFQUN6Qyw0REFBNEQ7RUFDNUQsZUFBZTtFQUNmLFlBQVk7RUFDWixXQUFXO0VBQ1gsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBO0VBQ0UscUNBQXFDO0VBQ3JDLFVBQVU7RUFDVixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDREQUE0RDtFQUM1RCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsNERBQTREO0VBQzVELGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDREQUE0RDtFQUM1RCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUNBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDREQUE0RDtFQUM1RCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLGFBQWE7RUFDYixVQUFVO0VBQ1YsY0FBYztBQUNoQjs7QUFFRTtJQUNFLFdBQVc7RUFDYjs7QUFFRjtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWiwyREFBMkQ7RUFDM0QsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQiw4QkFBOEI7RUFDOUIsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1Qiw2QkFBNkI7RUFDN0IsNERBQTREO0VBQzVELGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUU7SUFDRSxXQUFXO0lBQ1gsNkJBQTZCO0VBQy9COztBQUVBO0lBQ0UsVUFBVTtJQUNWLGNBQWM7RUFDaEI7O0FBRUE7SUFDRSxVQUFVO0VBQ1o7O0FBRUE7SUFDRSxVQUFVO0VBQ1o7O0FBRUE7SUFDRSxVQUFVO0VBQ1o7O0FBRUE7SUFDRSxVQUFVO0VBQ1o7O0FBRUE7SUFDRSxVQUFVO0VBQ1o7O0FBRUE7SUFDRSxVQUFVO0VBQ1o7O0FBRUE7SUFDRSxVQUFVO0VBQ1oiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2dhbWUvZ2FtZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbmJvZHksIGh0bWwge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5saW5lIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4uYmcge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCh+L2ltYWdlcy9iYWNrZ3JvdW5kL21haW5iYWNrZ3JvdW5kLmpwZyk7XHJcbiAgbWluLWhlaWdodDogOTM3cHg7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufVxyXG5cclxuLnN0YXJ0cm91bmQge1xyXG4gIG1pbi1oZWlnaHQ6IDkzN3B4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnBsYXllcmluZm8ge1xyXG4gIGhlaWdodDogNTBweDtcclxuICBtYXgtaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiAyMCU7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMThwdDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxufVxyXG5cclxuLmRlYWxlcm5pY2tuYW1lIHtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgbWF4LWhlaWdodDogNTBweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxOHB0O1xyXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmRlYWxlcmFyZWEge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1pbi1oZWlnaHQ6IDE5MHB4O1xyXG4gIHBhZGRpbmctbGVmdDogNDAlO1xyXG59XHJcblxyXG4uZ2FtZWFyZWEge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNDAwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODksMTg5LDE4OSwgMC4wNSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLnBsYXllcnBvaW50cyB7XHJcbiAgd2lkdGg6IDIwJTtcclxuICBiYWNrZ3JvdW5kOiB1bnNldDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOCwyMzgsMjM4LCAwLjAyKTtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxOHB0O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmbG9hdDogbGVmdDtcclxuICBkaXNwbGF5OmlubGluZS1mbGV4O1xyXG59XHJcblxyXG4ubmlja25hbWVzIHtcclxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgcGFkZGluZy10b3A6IDI0JTtcclxuICB3aWR0aDogNzAlO1xyXG4gIGhlaWdodDogNDAwcHg7XHJcbn1cclxuXHJcbi5zZXBhcmF0b3Ige1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40OCk7XHJcbiAgd2lkdGg6IDEwJTtcclxuICBoZWlnaHQ6IDQwMHB4O1xyXG59XHJcblxyXG4ucG9pbnRzIHtcclxuICB3aWR0aDogMjAlO1xyXG4gIHBhZGRpbmctdG9wOiAyNCU7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxufVxyXG5cclxuLmdhbWVwcm9jZXNzLWJsb2NrIHtcclxuICB3aWR0aDogNTglO1xyXG4gIGhlaWdodDogNDAwcHg7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbn1cclxuXHJcbi5yb3VuZHN0YXRlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMjRwdDtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxufVxyXG5cclxuLmdhbWVwcm9jZXNzIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDM1MHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LXNpemU6IDU0cHQ7XHJcbiAgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmO1xyXG4gIGNvbG9yOiBhbGljZWJsdWU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZ2FtZXByb2Nlc3MtYW5pbWF0aW9uIHtcclxuICB3aWR0aDogNzAlO1xyXG4gIGhlaWdodDogMTUwcHg7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5yb3VuZHN0YXRlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMjRwdDtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxufVxyXG5cclxuLnBlb3BsZXBsYXllci1ibG9jayB7XHJcbiAgd2lkdGg6IDIwJTtcclxuICBoZWlnaHQ6IDQwMHB4O1xyXG59XHJcbi50b3RhbC1jYXNoIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMjRwdDtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgY29sb3I6IGFsaWNlYmx1ZTtcclxufVxyXG5cclxuLmFjdGlvbi1ibG9jayB7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBtYXJnaW4tdG9wOiA0cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwJTtcclxuICBtYXJnaW4tcmlnaHQ6IDEwJTtcclxuICBoZWlnaHQ6IDE1M3B4O1xyXG4gIHBhZGRpbmctdG9wOiAzcHg7XHJcbn1cclxuXHJcbi5wbGF5ZXJhcmVhIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtaW4taGVpZ2h0OiAxOTBweDtcclxufVxyXG5cclxuLmNhcmRzIHtcclxuICBmbG9hdDogbGVmdDtcclxuICBoZWlnaHQ6IDE5MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgd2lkdGg6IDIwJTtcclxuICBtYXgtd2lkdGg6IDIwJTtcclxufVxyXG5cclxuICAuY2FyZHMgLmNhcmQ6aG92ZXIge1xyXG4gICAgei1pbmRleDogMTA7XHJcbiAgfVxyXG5cclxuLmNhcmQge1xyXG4gIHdpZHRoOiAxMzNweDtcclxuICBoZWlnaHQ6IDE4NnB4O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgbWFyZ2luLWxlZnQ6IC0xMDVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBib3JkZXItc3R5bGU6IG5vbmU7XHJcbn1cclxuXHJcbi5nYW1lb3Zlci1pdGVtIHtcclxuICB3aWR0aDogNjAlO1xyXG4gIG1pbi1oZWlnaHQ6IDcwcHg7XHJcbiAgbWF4LWhlaWdodDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgZm9udC1mYW1pbHk6J1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAyNnB0O1xyXG4gIGNvbG9yOiBhbGljZWJsdWU7XHJcbn1cclxuXHJcbi53aW5uZXJzLWFyZWEge1xyXG4gIHdpZHRoOiA1MCU7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxuICBtYXJnaW46YXV0bztcclxufVxyXG5cclxuLndpbm5lciB7XHJcbiAgd2lkdGg6IDUwJTtcclxuICBtaW4taGVpZ2h0OiAxMDBweDtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgbWFyZ2luLXRvcDogNDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJvcmRlci1ib3R0b206ICNkZGQgZGFzaGVkIDJweDtcclxuICBib3JkZXItdG9wOiAjZGRkIGRhc2hlZCAycHg7XHJcbiAgYm9yZGVyLWxlZnQ6ICNkZGQgZGFzaGVkIDJweDtcclxuICBib3JkZXItcmlnaHQ6ICNkZGQgZGFzaGVkIDJweDtcclxuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAyNnB0O1xyXG4gIGNvbG9yOiBhbGljZWJsdWU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODksMTg5LDE4OSwgMC4wNSk7XHJcbn1cclxuXHJcbi5kb3R0ZWQtbGluZS10b3Age1xyXG4gIGJvcmRlci10b3A6ICNkZGQgZGFzaGVkIDJweDtcclxuICBtYXJnaW4tdG9wOiA1cHg7XHJcbn1cclxuXHJcbi5nYW1lb3Zlci1pdGVtLW5pY2tuYW1lIHtcclxuICBtYXJnaW4tbGVmdDogNDAlO1xyXG59XHJcblxyXG4uZ2FtZW92ZXItaXRlbS13aW5zIHtcclxuICBtYXJnaW4tbGVmdDogNDAlO1xyXG59XHJcblxyXG4gIC5jYXJkOmhvdmVyIHtcclxuICAgIHotaW5kZXg6IDEwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgfVxyXG5cclxuICAuY2FyZDpudGgtY2hpbGQoMSkge1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQ6bnRoLWNoaWxkKDIpIHtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgfVxyXG5cclxuICAuY2FyZDpudGgtY2hpbGQoMykge1xyXG4gICAgei1pbmRleDogMztcclxuICB9XHJcblxyXG4gIC5jYXJkOm50aC1jaGlsZCg0KSB7XHJcbiAgICB6LWluZGV4OiA0O1xyXG4gIH1cclxuXHJcbiAgLmNhcmQ6bnRoLWNoaWxkKDUpIHtcclxuICAgIHotaW5kZXg6IDU7XHJcbiAgfVxyXG5cclxuICAuY2FyZDpudGgtY2hpbGQoNikge1xyXG4gICAgei1pbmRleDogNjtcclxuICB9XHJcblxyXG4gIC5jYXJkOm50aC1jaGlsZCg3KSB7XHJcbiAgICB6LWluZGV4OiA3O1xyXG4gIH1cclxuXHJcbiAgLmNhcmQ6bnRoLWNoaWxkKDgpIHtcclxuICAgIHotaW5kZXg6IDg7XHJcbiAgfVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/game/game.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/game/game.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!doctype html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\r\n  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n  <title>Hello, world!</title>\r\n</head>\r\n<body>\r\n  <div class=\"bg\">\r\n    <div class=\"startround\" *ngIf=\"this.gameState == 1\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-lg\" style=\"width: 25%; height: 100px; font-size: 24pt\" (click)=\"DealCards()\">Start new round</button>\r\n    </div>\r\n\r\n    <div *ngIf=\"(this.gameState == 2 || this.gameState == 3 || this.gameState == 4) && this.response\">\r\n      <div class=\"dealerarea\">\r\n        <div class=\"cards\">\r\n          <div class=\"card\" *ngFor=\"let usercard of dealer.cards\"><img src=\"images/cards/{{usercard.suit}}-{{usercard.cardName}}.png\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"dealernickname\">Dealer</div>\r\n      <div class=\"gamearea\">\r\n        <div class=\"playerpoints\">\r\n          <div class=\"nicknames\">\r\n            <div *ngFor=\"let userRound of userRounds\">{{userRound.nickname}}</div>\r\n          </div>\r\n          <div class=\"points\">\r\n            <div *ngFor=\"let userRound of userRounds\">{{userRound.points}}</div>\r\n          </div>\r\n          <div class=\"separator\"></div>\r\n        </div>\r\n        <div class=\"gameprocess-block\">\r\n          <div class=\"roundstate\">Round#{{this.response.rounds.length}}</div>\r\n          <div class=\"gameprocess\">\r\n            <div class=\"gameprocess-animation\">\r\n              {{this.gameProcess}}\r\n              <div class=\"spinner-grow\" style=\"width: 4rem; height: 4rem; margin-left: 3%; margin-top: 2%\" role=\"status\">\r\n                <span class=\"sr-only\">Loading...</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"separator\" style=\"width: 2%; background-color: rgba(0, 0, 0, 0.38)\"></div>\r\n        <div class=\"peopleplayer-block\">\r\n          <div class=\"total-cash\">Total cash: {{this.person.cash}}$</div>\r\n          <div class=\"action-block\">\r\n            <div *ngIf=\"this.gameState == 2\">\r\n              <button type=\"button\" class=\"btn btn-success btn-lg btn-block\" (click)=\"DealCardToPlayer()\">Take a card</button>\r\n              <button type=\"button\" class=\"btn btn-danger btn-lg btn-block\" (click)=\"SkipCard()\">Skip a card</button>\r\n              <button type=\"button\" class=\"btn btn-info btn-lg btn-block\" data-toggle=\"modal\" data-target=\"#exampleModal\">Replenish a cash</button>\r\n            </div>\r\n            <div *ngIf=\"this.gameState == 3 || this.gameState == 4\">\r\n              <button type=\"button\" class=\"btn btn-success btn-lg btn-block disabled\" aria-disabled=\"true\">Take a card</button>\r\n              <button type=\"button\" class=\"btn btn-danger btn-lg btn-block disabled\" aria-disabled=\"true\">Skip a card</button>\r\n              <button type=\"button\" class=\"btn btn-info btn-lg btn-block\" data-toggle=\"modal\" data-target=\"#exampleModal\">Replenish a cash</button>\r\n            </div>\r\n            <div *ngIf=\"this.gameState == 4\">\r\n              <button type=\"button\" class=\"btn btn-info btn-lg btn-block\" (click)=\"CreateNewRound()\" style=\"margin-top: 3%\">New Round</button>\r\n            </div>\r\n            <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n              <div class=\"modal-dialog\" role=\"document\">\r\n                <div class=\"modal-content\">\r\n                  <div class=\"modal-header\">\r\n                    <h5 class=\"modal-title\" id=\"exampleModalLabel\">Replenish a cash</h5>\r\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n                      <span aria-hidden=\"true\">&times;</span>\r\n                    </button>\r\n                  </div>\r\n                  <div class=\"modal-body\">\r\n                    <input type=\"number\" min=\"1\" class=\"form-control\" placeholder=\"cash\" aria-label=\"Username\" aria-describedby=\"basic-addon1\" [(ngModel)]=\"requestReplenishCash.cash\">\r\n                  </div>\r\n                  <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"ReplenishCash()\">Send</button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"playerarea\">\r\n        <div class=\"cards\" *ngFor=\"let user of users\">\r\n          <div class=\"card\" *ngFor=\"let usercard of user.cards\"><img src=\"images/cards/{{usercard.suit}}-{{usercard.cardName}}.png\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"playerinfo\" *ngFor=\"let user of users\">{{user.nickname}}</div>\r\n    </div>\r\n    <div *ngIf=\"this.gameState == 5\">\r\n      <div class=\"row\" style=\"color:aliceblue; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 22pt; text-align:center; width: 100%\">\r\n        <div class=\"col-sm\" *ngFor=\"let user of this.responseGameOver\" style=\"border-right: #ddd dashed 1px;border-left: #ddd dashed 1px;\">\r\n          <div>{{user.username}}</div>\r\n          <div>{{user.winsQuantity}} wins</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"dotted-line-top\"></div>\r\n      <div style=\"font-size: 24pt; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align:center; color:aliceblue; margin-top: 20px;\">Winners: </div>\r\n      <div class=\"winners-area\">\r\n        <div *ngIf=\"this.winners\">\r\n          <div class=\"winner\" *ngFor=\"let user of winners\">{{user.username}}</div>\r\n        </div>\r\n        <div *ngIf=\"!this.winners\">\r\n          <div class=\"winner\">All players lose</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

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
    function GameComponent(storage, service, router, currentRoute) {
        this.storage = storage;
        this.service = service;
        this.router = router;
        this.currentRoute = currentRoute;
    }
    GameComponent.prototype.InitializeUsers = function () {
        this.users = this.response.users.filter(function (user) { return user.userRole != src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].Dealer; });
        this.dealer = this.response.users.filter(function (user) { return user.userRole == src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].Dealer; }).shift();
        this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;
        this.userGames = this.response.userGames;
        this.person = this.users.filter(function (user) { return user.userRole == src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].PeoplePlayer; }).shift();
    };
    GameComponent.prototype.CreateNewRound = function () {
        var _this = this;
        this.service.CreateNewRound(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.DealCards();
        });
    };
    GameComponent.prototype.ReplenishCash = function () {
        var _this = this;
        this.requestReplenishCash.userId = this.person.id;
        console.log(1);
        this.service.ReplenishCash(this.requestReplenishCash).subscribe(function (data) { _this.person.cash = data; });
    };
    GameComponent.prototype.DealCardToPlayer = function () {
        var _this = this;
        this.gameProcess = "Your turn";
        this.storage.set('gameProcess', this.gameProcess);
        this.service.DealCardToPlayer(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
        });
    };
    GameComponent.prototype.DealCardsToBots = function () {
        var _this = this;
        this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].BotsMove;
        this.storage.set('key', this.gameState);
        this.gameProcess = "Bots draw cards";
        this.storage.set('gameProcess', this.gameProcess);
        var gameId = this.currentRoute.snapshot.params['id'];
        this.service.DealCardsToBots(gameId).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
            setTimeout(function () { _this.DealCardsToDealer(); }, 4000);
        });
    };
    GameComponent.prototype.GameOver = function () {
        var _this = this;
        this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].GameIsOver;
        this.storage.set('key', this.gameState);
        this.gameProcess = "Game is over";
        this.storage.set('gameProcess', this.gameProcess);
        this.service.GameOver(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.responseGameOver = data;
            _this.InitializeWinners();
        });
    };
    GameComponent.prototype.InitializeWinners = function () {
        var firstWinner = this.responseGameOver.sort(function (item1, item2) { return item2.winsQuantity - item1.winsQuantity; })[0];
        if (firstWinner.winsQuantity != 0) {
            this.winners = this.responseGameOver.filter(function (user) { return user.winsQuantity == firstWinner.winsQuantity; });
        }
    };
    GameComponent.prototype.DealCardsToDealer = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].DealerMove;
                this.storage.set('key', this.gameState);
                this.gameProcess = "Dealer draw cards";
                this.storage.set('gameProcess', this.gameProcess);
                this.service.DealCardsToDealer(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
                    _this.response = data;
                    _this.InitializeUsers();
                    _this.gameIsOver = _this.response.isOver;
                    if (_this.gameIsOver) {
                        setTimeout(function () {
                            _this.GameOver();
                        }, 3000);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    GameComponent.prototype.SkipCard = function () {
        var _this = this;
        setTimeout(function () { _this.DealCardsToBots(); }, 4000);
    };
    GameComponent.prototype.DealCards = function () {
        var _this = this;
        this.gameProcess = "New round";
        this.storage.set('gameProcess', this.gameProcess);
        this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].PeopleMove;
        this.storage.set('key', this.gameState);
        this.service.DealCards(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
            console.log(_this.response);
        });
    };
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameProcess = this.storage.get('gameProcess');
        this.requestReplenishCash = new src_app_viewmodels_ReplenishCashViewModels_request_replenish_cash_view_model__WEBPACK_IMPORTED_MODULE_5__["RequestReplenishCashViewModel"](0, 0);
        this.bots = new Array();
        this.gameState = this.storage.get('key');
        this.service.GameById(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.InitializeUsers();
            if (_this.response.isOver && _this.gameState == src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_6__["GameState"].GameIsOver) {
                _this.GameOver();
            }
        });
    };
    GameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-game',
            template: __webpack_require__(/*! ./game.component.html */ "./src/app/components/game/game.component.html"),
            styles: [__webpack_require__(/*! ./game.component.css */ "./src/app/components/game/game.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(angular_webstorage_service__WEBPACK_IMPORTED_MODULE_7__["LOCAL_STORAGE"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angular_webstorage_service__WEBPACK_IMPORTED_MODULE_7__["WebStorageService"], src_app_services_GameService_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], GameComponent);
    return GameComponent;
}());



/***/ }),

/***/ "./src/app/components/history/history.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/history/history.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bg {\r\n  background-image: url('/images/background/mainbackground.jpg');\r\n  min-height: 938px;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n}\r\n\r\n.user-autocomplete {\r\n  width: 300px;\r\n  height: 60px;\r\n  text-align: center;\r\n  font-size: 20pt;\r\n  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9oaXN0b3J5L2hpc3RvcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDhEQUE2RDtFQUM3RCxpQkFBaUI7RUFDakIsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsMkRBQTJEO0FBQzdEIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9oaXN0b3J5L2hpc3RvcnkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iZyB7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKH4vaW1hZ2VzL2JhY2tncm91bmQvbWFpbmJhY2tncm91bmQuanBnKTtcclxuICBtaW4taGVpZ2h0OiA5MzhweDtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcblxyXG4udXNlci1hdXRvY29tcGxldGUge1xyXG4gIHdpZHRoOiAzMDBweDtcclxuICBoZWlnaHQ6IDYwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMjBwdDtcclxuICBmb250LWZhbWlseTonU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/history/history.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/history/history.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bg\" style=\"padding-top: 30px\">\r\n  <div style=\"display:flex; justify-content:center; align-items: center\">\r\n    <input type=\"text\" id=\"userIdFirstWay\" style=\"align-self: center\" list=\"users\" class=\"user-autocomplete\" [(ngModel)]=\"username\" />\r\n    <datalist id=\"users\">\r\n      <option *ngFor=\"let item of this.users\" [value]=\"item.username\"></option>\r\n    </datalist>\r\n\r\n    <button (click)=\"GetGamesByUser()\" style=\"width:3%; height: 60px; background-image: url(images/icons/search.png); background-repeat: no-repeat\"></button>\r\n  </div>\r\n</div>\r\n"

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
    function HistoryComponent(service) {
        this.service = service;
        this.response = new Array();
    }
    HistoryComponent.prototype.GetGameDetails = function (gameId) {
        var _this = this;
        this.service.GetGameDetails(gameId).subscribe(function (data) {
            _this.response.push(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, data));
        });
    };
    HistoryComponent.prototype.GetGamesByUser = function () {
        var _this = this;
        var user = this.users.filter(function (item) { return item.username == _this.username; }).shift();
        this.service.GetGamesByUser(user.id).subscribe(function (data) {
            _this.games = data;
            for (var i = 0; i < _this.games.length; i++) {
                _this.GetGameDetails(_this.games[i].gameId);
            }
        });
    };
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.GetUsersForAutocomplete().subscribe(function (data) {
            _this.users = data;
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

/***/ "./src/app/components/start/start.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/start/start.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\nbody, html {\r\n  height: 100%;\r\n  margin: 0;\r\n}\r\n\r\n.line {\r\n  margin-top: 10px;\r\n}\r\n\r\n.bg {\r\n  background-image: url('/images/background/mainbackground.jpg');\r\n  min-height: 938px;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFlBQVk7RUFDWixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSw4REFBNkQ7RUFDN0QsaUJBQWlCO0VBQ2pCLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsc0JBQXNCO0FBQ3hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbmJvZHksIGh0bWwge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5saW5lIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4uYmcge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCh+L2ltYWdlcy9iYWNrZ3JvdW5kL21haW5iYWNrZ3JvdW5kLmpwZyk7XHJcbiAgbWluLWhlaWdodDogOTM4cHg7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/start/start.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/start/start.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!doctype html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\r\n  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n  <title>blackjack</title>\r\n</head>\r\n<body>\r\n  <div class=\"bg\">\r\n    <div class=\"container\" style=\"padding-top: 15%\">\r\n      <div class=\"row\">\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\">\r\n          <div class=\"line\"></div>\r\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"user.Nickname\" placeholder=\"Nickname\" />\r\n          <div class=\"line\"></div>\r\n          <input type=\"number\" value=\"\" min=\"1\" placeholder=\"Rate\" class=\"form-control\" [(ngModel)]=\"request.userRate\" />\r\n          <div class=\"line\"></div>\r\n          <input type=\"number\" value=\"\" min=\"1\" placeholder=\"Bot quantity\" class=\"form-control\" [(ngModel)]=\"request.botQuantity\" />\r\n          <div class=\"line\"></div>\r\n          <input type=\"number\" value=\"\" min=\"1\" placeholder=\"Round quantity\" class=\"form-control\" [(ngModel)]=\"request.roundQuantity\" />\r\n          <div class=\"line\"></div>\r\n          <button class=\"btn btn-primary\" (click)=\"CreateNewGame()\" style=\"width: 100%\">Create new game</button>\r\n          <button class=\"btn btn-primary\" (click)=\"ToHistory()\" style=\"width: 100%; margin-top: 10px\">History</button>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

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
    function StartComponent(storage, startService, router) {
        this.storage = storage;
        this.startService = startService;
        this.router = router;
    }
    StartComponent.prototype.ToHistory = function () {
        this.router.navigate(['game/history']);
    };
    StartComponent.prototype.CreateNewGame = function () {
        var _this = this;
        this.storage.set('username', this.user.Nickname);
        this.startService.CreateNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this.router.navigate(['game/' + data.id]);
            _this.gameState = src_app_shared_enums_game_state__WEBPACK_IMPORTED_MODULE_7__["GameState"].StartRound;
            _this.storage.set('key', _this.gameState);
        });
    };
    StartComponent.prototype.ngOnInit = function () {
        this.user = new src_app_viewmodels_UserViewModels_request_user_view_model__WEBPACK_IMPORTED_MODULE_3__["RequestUserViewModel"]("");
        this.request = new src_app_viewmodels_GameViewModels_request_game_view_model__WEBPACK_IMPORTED_MODULE_2__["default"](this.user, 0, 0, 0);
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

/***/ "./src/app/modules/game.module.ts":
/*!****************************************!*\
  !*** ./src/app/modules/game.module.ts ***!
  \****************************************/
/*! exports provided: GameModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameModule", function() { return GameModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_game_game_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/game/game.component */ "./src/app/components/game/game.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");







var routes = [
    {
        path: ':id',
        component: _components_game_game_component__WEBPACK_IMPORTED_MODULE_3__["GameComponent"]
    }
];
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_components_game_game_component__WEBPACK_IMPORTED_MODULE_3__["GameComponent"]],
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

/***/ "./src/app/modules/history.module.ts":
/*!*******************************************!*\
  !*** ./src/app/modules/history.module.ts ***!
  \*******************************************/
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
/* harmony import */ var _components_history_history_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/history/history.component */ "./src/app/components/history/history.component.ts");






var routes = [
    {
        path: 'history',
        component: _components_history_history_component__WEBPACK_IMPORTED_MODULE_5__["HistoryComponent"]
    }
];
var HistoryModule = /** @class */ (function () {
    function HistoryModule() {
    }
    HistoryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_components_history_history_component__WEBPACK_IMPORTED_MODULE_5__["HistoryComponent"]],
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

/***/ "./src/app/modules/start.module.ts":
/*!*****************************************!*\
  !*** ./src/app/modules/start.module.ts ***!
  \*****************************************/
/*! exports provided: StartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartModule", function() { return StartModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_start_start_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/start/start.component */ "./src/app/components/start/start.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../node_modules/@angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");







var routes = [
    {
        path: 'start',
        component: _components_start_start_component__WEBPACK_IMPORTED_MODULE_3__["StartComponent"]
    }
];
var StartModule = /** @class */ (function () {
    function StartModule() {
    }
    StartModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _components_start_start_component__WEBPACK_IMPORTED_MODULE_3__["StartComponent"]
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
    AccountService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(angular_webstorage_service__WEBPACK_IMPORTED_MODULE_3__["LOCAL_STORAGE"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular_webstorage_service__WEBPACK_IMPORTED_MODULE_3__["WebStorageService"]])
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



var GameService = /** @class */ (function () {
    function GameService(http) {
        this.http = http;
        this.url = "/api/game/";
    }
    GameService.prototype.GameById = function (id) {
        return this.http.get(this.url + "gamebyid/" + id);
    };
    GameService.prototype.DealCards = function (id) {
        return this.http.post(this.url + "dealcards/" + id, id);
    };
    GameService.prototype.DealCardToPlayer = function (id) {
        return this.http.post(this.url + "dealcardstoplayer/" + id, id);
    };
    GameService.prototype.ReplenishCash = function (request) {
        var result = this.http.post(this.url + "replenishcash", request);
        return result;
    };
    GameService.prototype.DealCardsToBots = function (gameId) {
        var result = this.http.post(this.url + "dealcardstobots/" + gameId, gameId);
        return result;
    };
    GameService.prototype.DealCardsToDealer = function (id) {
        var result = this.http.post(this.url + "dealcardstodealer/" + id, id);
        return result;
    };
    GameService.prototype.CreateNewRound = function (id) {
        var result = this.http.post(this.url + "createround/" + id, id);
        return result;
    };
    GameService.prototype.GameOver = function (id) {
        var result = this.http.get(this.url + "gameover/" + id);
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



var HistoryService = /** @class */ (function () {
    function HistoryService(http) {
        this.http = http;
        this.url = "/api/history/";
    }
    HistoryService.prototype.GetUsersForAutocomplete = function () {
        var result = this.http.get(this.url + "getpersons");
        return result;
    };
    HistoryService.prototype.GetGamesByUser = function (userId) {
        var result = this.http.get(this.url + "gamesbyuser/" + userId);
        return result;
    };
    HistoryService.prototype.GetGameDetails = function (gameId) {
        var result = this.http.get(this.url + "gamedetails/" + gameId);
        return result;
    };
    HistoryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
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



var StartService = /** @class */ (function () {
    function StartService(http) {
        this.http = http;
        this.url = "/api/game";
    }
    StartService.prototype.CreateNewGame = function (request) {
        var result = this.http.post(this.url + "/create", request);
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
    function RequestUserViewModel(Nickname) {
        this.Nickname = Nickname;
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
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


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