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







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"].forRoot()
            ],
            providers: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/game/game.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/game/game.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\nbody, html {\r\n  height: 100%;\r\n  margin: 0;\r\n}\r\n\r\n.line {\r\n  margin-top: 10px;\r\n}\r\n\r\n.bg {\r\n  background-image: url('/images/background/mainbackground.jpg');\r\n  min-height: 937px;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n}\r\n\r\n.nickname\r\n{\r\n  height: 50px;\r\n  max-height: 50px;\r\n  width: 20%;\r\n  float: left;\r\n  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  color: whitesmoke;\r\n  text-align: center;\r\n}\r\n\r\n.dealernickname {\r\n  height: 50px;\r\n  max-height: 50px;\r\n  width: 100%;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  color: whitesmoke;\r\n  text-align: center;\r\n}\r\n\r\n.dealerarea {\r\n  width: 100%;\r\n  min-height: 190px;\r\n  padding-left: 40%;\r\n}\r\n\r\n.gamearea {\r\n  width: 100%;\r\n  height: 450px;\r\n  background-color: rgba(189,189,189, 0.05);\r\n}\r\n\r\n.playerpoints {\r\n  width: 30%;\r\n  height: 450px;\r\n  background: unset;\r\n  background-color: rgba(238,238,238, 0.02);\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n  font-size: 18pt;\r\n  color: white;\r\n}\r\n\r\n.playerarea {\r\n  width: 100%;\r\n  min-height: 190px;\r\n}\r\n\r\n.cards {\r\n  float: left;\r\n  height: 190px;\r\n  display: flex;\r\n  width: 20%;\r\n  max-width: 20%;\r\n}\r\n\r\n.cards .card:hover {\r\n    z-index: 10;\r\n  }\r\n\r\n.card {\r\n  width: 133px;\r\n  height: 186px;\r\n  background-size: cover;\r\n  margin-left: -105px;\r\n  background-color: transparent;\r\n  border-style: none;\r\n}\r\n\r\n.card:hover {\r\n    z-index: 10;\r\n    background-color: transparent;\r\n  }\r\n\r\n.card:nth-child(1) {\r\n    z-index: 1;\r\n    margin-left: 0;\r\n  }\r\n\r\n.card:nth-child(2) {\r\n    z-index: 2;\r\n  }\r\n\r\n.card:nth-child(3) {\r\n    z-index: 3;\r\n  }\r\n\r\n.card:nth-child(4) {\r\n    z-index: 4;\r\n  }\r\n\r\n.card:nth-child(5) {\r\n    z-index: 5;\r\n  }\r\n\r\n.card:nth-child(6) {\r\n    z-index: 6;\r\n  }\r\n\r\n.card:nth-child(7) {\r\n    z-index: 7;\r\n  }\r\n\r\n.card:nth-child(8) {\r\n    z-index: 8;\r\n  }\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9nYW1lL2dhbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxZQUFZO0VBQ1osU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsOERBQTZEO0VBQzdELGlCQUFpQjtFQUNqQiwyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLHNCQUFzQjtBQUN4Qjs7QUFFQTs7RUFFRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixXQUFXO0VBQ1gsMkRBQTJEO0VBQzNELGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsNERBQTREO0VBQzVELGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLFVBQVU7RUFDVixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLHlDQUF5QztFQUN6Qyw0REFBNEQ7RUFDNUQsZUFBZTtFQUNmLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLGFBQWE7RUFDYixVQUFVO0VBQ1YsY0FBYztBQUNoQjs7QUFFRTtJQUNFLFdBQVc7RUFDYjs7QUFFRjtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0Isa0JBQWtCO0FBQ3BCOztBQUVFO0lBQ0UsV0FBVztJQUNYLDZCQUE2QjtFQUMvQjs7QUFFQTtJQUNFLFVBQVU7SUFDVixjQUFjO0VBQ2hCOztBQUVBO0lBQ0UsVUFBVTtFQUNaOztBQUVBO0lBQ0UsVUFBVTtFQUNaOztBQUVBO0lBQ0UsVUFBVTtFQUNaOztBQUVBO0lBQ0UsVUFBVTtFQUNaOztBQUVBO0lBQ0UsVUFBVTtFQUNaOztBQUVBO0lBQ0UsVUFBVTtFQUNaOztBQUVBO0lBQ0UsVUFBVTtFQUNaIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9nYW1lL2dhbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG5ib2R5LCBodG1sIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4ubGluZSB7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLmJnIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwofi9pbWFnZXMvYmFja2dyb3VuZC9tYWluYmFja2dyb3VuZC5qcGcpO1xyXG4gIG1pbi1oZWlnaHQ6IDkzN3B4O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuXHJcbi5uaWNrbmFtZVxyXG57XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIG1heC1oZWlnaHQ6IDUwcHg7XHJcbiAgd2lkdGg6IDIwJTtcclxuICBmbG9hdDogbGVmdDtcclxuICBmb250LWZhbWlseTonU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE4cHQ7XHJcbiAgY29sb3I6IHdoaXRlc21va2U7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZGVhbGVybmlja25hbWUge1xyXG4gIGhlaWdodDogNTBweDtcclxuICBtYXgtaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE4cHQ7XHJcbiAgY29sb3I6IHdoaXRlc21va2U7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZGVhbGVyYXJlYSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogMTkwcHg7XHJcbiAgcGFkZGluZy1sZWZ0OiA0MCU7XHJcbn1cclxuXHJcbi5nYW1lYXJlYSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiA0NTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE4OSwxODksMTg5LCAwLjA1KTtcclxufVxyXG5cclxuLnBsYXllcnBvaW50cyB7XHJcbiAgd2lkdGg6IDMwJTtcclxuICBoZWlnaHQ6IDQ1MHB4O1xyXG4gIGJhY2tncm91bmQ6IHVuc2V0O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjM4LDIzOCwyMzgsIDAuMDIpO1xyXG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE4cHQ7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4ucGxheWVyYXJlYSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogMTkwcHg7XHJcbn1cclxuXHJcbi5jYXJkcyB7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgaGVpZ2h0OiAxOTBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiAyMCU7XHJcbiAgbWF4LXdpZHRoOiAyMCU7XHJcbn1cclxuXHJcbiAgLmNhcmRzIC5jYXJkOmhvdmVyIHtcclxuICAgIHotaW5kZXg6IDEwO1xyXG4gIH1cclxuXHJcbi5jYXJkIHtcclxuICB3aWR0aDogMTMzcHg7XHJcbiAgaGVpZ2h0OiAxODZweDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIG1hcmdpbi1sZWZ0OiAtMTA1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xyXG59XHJcblxyXG4gIC5jYXJkOmhvdmVyIHtcclxuICAgIHotaW5kZXg6IDEwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgfVxyXG5cclxuICAuY2FyZDpudGgtY2hpbGQoMSkge1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQ6bnRoLWNoaWxkKDIpIHtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgfVxyXG5cclxuICAuY2FyZDpudGgtY2hpbGQoMykge1xyXG4gICAgei1pbmRleDogMztcclxuICB9XHJcblxyXG4gIC5jYXJkOm50aC1jaGlsZCg0KSB7XHJcbiAgICB6LWluZGV4OiA0O1xyXG4gIH1cclxuXHJcbiAgLmNhcmQ6bnRoLWNoaWxkKDUpIHtcclxuICAgIHotaW5kZXg6IDU7XHJcbiAgfVxyXG5cclxuICAuY2FyZDpudGgtY2hpbGQoNikge1xyXG4gICAgei1pbmRleDogNjtcclxuICB9XHJcblxyXG4gIC5jYXJkOm50aC1jaGlsZCg3KSB7XHJcbiAgICB6LWluZGV4OiA3O1xyXG4gIH1cclxuXHJcbiAgLmNhcmQ6bnRoLWNoaWxkKDgpIHtcclxuICAgIHotaW5kZXg6IDg7XHJcbiAgfVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/game/game.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/game/game.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!doctype html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\r\n  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n  <title>Hello, world!</title>\r\n</head>\r\n<body>\r\n  <div class=\"bg\" *ngIf=\"isLoad\">\r\n    <div class=\"dealerarea\">\r\n      <div class=\"cards\">\r\n        <div class=\"card\" *ngFor=\"let usercard of dealer.cards\"><img src=\"images/cards/{{usercard.suit}}-{{usercard.cardName}}.png\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"dealernickname\">Dealer</div>\r\n    <div class=\"gamearea\">\r\n      <div class=\"playerpoints\"><p style=\"text-align: center\">Players point:</p>\r\n        <ul>\r\n          <li *ngFor=\"let userRound of userRounds\">{{userRound.points}}</li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n    <div class=\"playerarea\">\r\n      <div class=\"cards\" *ngFor=\"let user of users\">\r\n        <div class=\"card\" *ngFor=\"let usercard of user.cards\"><img src=\"images/cards/{{usercard.suit}}-{{usercard.cardName}}.png\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"nickname\" *ngFor=\"let user of users\">{{user.nickname}}</div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

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





var GameComponent = /** @class */ (function () {
    function GameComponent(service, router, currentRoute) {
        this.service = service;
        this.router = router;
        this.currentRoute = currentRoute;
    }
    GameComponent.prototype.InitializeUsers = function () {
        this.users = this.response.users.filter(function (user) { return user.userRole != src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].Dealer; });
        this.dealer = this.response.users.filter(function (user) { return user.userRole == src_app_shared_enums_user_role__WEBPACK_IMPORTED_MODULE_4__["UserRole"].Dealer; }).shift();
        this.userRounds = this.response.rounds[this.response.rounds.length - 1].userRound;
    };
    GameComponent.prototype.Show = function () {
        console.log(this.dealer.cards);
    };
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoad = false;
        this.service.GameById(this.currentRoute.snapshot.params['id']).subscribe(function (data) {
            _this.response = data;
            _this.service.DealCards(_this.currentRoute.snapshot.params['id']).subscribe(function (newdata) {
                _this.response = newdata;
                _this.InitializeUsers();
                _this.isLoad = true;
                console.log(_this.response);
            });
        });
    };
    GameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-game',
            template: __webpack_require__(/*! ./game.component.html */ "./src/app/components/game/game.component.html"),
            styles: [__webpack_require__(/*! ./game.component.css */ "./src/app/components/game/game.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_GameService_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], GameComponent);
    return GameComponent;
}());



/***/ }),

/***/ "./src/app/components/start/start.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/start/start.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\nbody, html {\r\n  height: 100%;\r\n  margin: 0;\r\n}\r\n\r\n.line {\r\n  margin-top: 10px;\r\n}\r\n\r\n.bg {\r\n  /* The image used */\r\n  background-image: url('/images/background/mainbackground.jpg');\r\n  /* Full height */\r\n  min-height: 938px;\r\n  /* Center and scale the image nicely */\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFlBQVk7RUFDWixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsOERBQTZEO0VBQzdELGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsc0NBQXNDO0VBQ3RDLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsc0JBQXNCO0FBQ3hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbmJvZHksIGh0bWwge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5saW5lIHtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4uYmcge1xyXG4gIC8qIFRoZSBpbWFnZSB1c2VkICovXHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKH4vaW1hZ2VzL2JhY2tncm91bmQvbWFpbmJhY2tncm91bmQuanBnKTtcclxuICAvKiBGdWxsIGhlaWdodCAqL1xyXG4gIG1pbi1oZWlnaHQ6IDkzOHB4O1xyXG4gIC8qIENlbnRlciBhbmQgc2NhbGUgdGhlIGltYWdlIG5pY2VseSAqL1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/start/start.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/start/start.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!doctype html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\r\n  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n  <title>blackjack</title>\r\n</head>\r\n<body>\r\n  <div class=\"bg\">\r\n    <div class=\"container\" style=\"padding-top: 15%\">\r\n      <div class=\"row\">\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\">\r\n          <div class=\"line\"></div>\r\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"user.Nickname\" placeholder=\"Nickname\" />\r\n          <div class=\"line\"></div>\r\n          <input type=\"number\" class=\"form-control\" [(ngModel)]=\"request.userRate\" />\r\n          <div class=\"line\"></div>\r\n          <input type=\"number\" class=\"form-control\" [(ngModel)]=\"request.botQuantity\" />\r\n          <div class=\"line\"></div>\r\n          <input type=\"number\" class=\"form-control\" [(ngModel)]=\"request.roundQuantity\" />\r\n          <div class=\"line\"></div>\r\n          <button class=\"btn btn-primary\" (click)=\"CreateNewGame()\" style=\"width: 100%\">Create new game</button>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

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






var StartComponent = /** @class */ (function () {
    function StartComponent(service, router) {
        this.service = service;
        this.router = router;
    }
    StartComponent.prototype.CreateNewGame = function () {
        var _this = this;
        this.request.user = this.user;
        this.service.CreateNewGame(this.request).subscribe(function (data) {
            _this.response = data;
            _this.router.navigate(['game/' + data.id]);
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
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_StartService_start_service__WEBPACK_IMPORTED_MODULE_4__["StartService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
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
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ]
        })
    ], GameModule);
    return GameModule;
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
                _node_modules_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ]
        })
    ], StartModule);
    return StartModule;
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
        this.url = "/api/game";
    }
    GameService.prototype.GameById = function (id) {
        return this.http.get(this.url + "/gamebyid/" + id);
    };
    GameService.prototype.DealCards = function (id) {
        return this.http.post(this.url + "/dealcards/" + id, id);
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