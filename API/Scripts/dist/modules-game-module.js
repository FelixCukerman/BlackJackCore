(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-game-module"],{

/***/ "./src/app/components/game/game.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/game/game.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\nbody, html {\r\n  height: 100%;\r\n  margin: 0;\r\n}\r\n\r\n.line {\r\n  margin-top: 10px;\r\n}\r\n\r\n.bg {\r\n  /* The image used */\r\n  background-image: url('mainbackground.jpg');\r\n  /* Full height */\r\n  min-height: 938px;\r\n  /* Center and scale the image nicely */\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n}\r\n\r\n.dealerarea {\r\n  width: 100%;\r\n  min-height: 350px;\r\n  background-color: aliceblue;\r\n}\r\n\r\n.gamearea\r\n{\r\n  min-height: 238px; \r\n  background-color:aqua;\r\n}\r\n\r\n.usersarea\r\n{\r\n  max-width: 100%;\r\n  padding: 0;\r\n  min-height: 350px;\r\n  background-color:blueviolet;\r\n}\r\n\r\n.card {\r\n  margin-top: 13px;\r\n  height: 186px;\r\n  max-height: 186px;\r\n  max-width: 133px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9nYW1lL2dhbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxZQUFZO0VBQ1osU0FBUztBQUNYOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLDJDQUFrRjtFQUNsRixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLHNDQUFzQztFQUN0QywyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsMkJBQTJCO0FBQzdCOztBQUVBOztFQUVFLGlCQUFpQjtFQUNqQixxQkFBcUI7QUFDdkI7O0FBRUE7O0VBRUUsZUFBZTtFQUNmLFVBQVU7RUFDVixpQkFBaUI7RUFDakIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9nYW1lL2dhbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG5ib2R5LCBodG1sIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4ubGluZSB7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLmJnIHtcclxuICAvKiBUaGUgaW1hZ2UgdXNlZCAqL1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi8uLi8uLi8uLi93d3dyb290L2ltYWdlcy9iYWNrZ3JvdW5kL21haW5iYWNrZ3JvdW5kLmpwZyk7XHJcbiAgLyogRnVsbCBoZWlnaHQgKi9cclxuICBtaW4taGVpZ2h0OiA5MzhweDtcclxuICAvKiBDZW50ZXIgYW5kIHNjYWxlIHRoZSBpbWFnZSBuaWNlbHkgKi9cclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcblxyXG4uZGVhbGVyYXJlYSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogMzUwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYWxpY2VibHVlO1xyXG59XHJcblxyXG4uZ2FtZWFyZWFcclxue1xyXG4gIG1pbi1oZWlnaHQ6IDIzOHB4OyBcclxuICBiYWNrZ3JvdW5kLWNvbG9yOmFxdWE7XHJcbn1cclxuXHJcbi51c2Vyc2FyZWFcclxue1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1pbi1oZWlnaHQ6IDM1MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6Ymx1ZXZpb2xldDtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gIG1hcmdpbi10b3A6IDEzcHg7XHJcbiAgaGVpZ2h0OiAxODZweDtcclxuICBtYXgtaGVpZ2h0OiAxODZweDtcclxuICBtYXgtd2lkdGg6IDEzM3B4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/game/game.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/game/game.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!doctype html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\r\n  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm\" crossorigin=\"anonymous\">\r\n  <title>Hello, world!</title>\r\n</head>\r\n<body>\r\n  <div class=\"bg\" *ngIf=\"isLoad\">\r\n    <div class=\"dealerarea\"></div>\r\n    <div class=\"gamearea\"></div>\r\n    <div class=\"usersarea\">\r\n      <div class=\"row\">\r\n        <div class=\"col\" style=\"background-color:green\">\r\n          <img src=\"/images/cards/1-1.png\"/>\r\n        </div>\r\n        <div class=\"col\" style=\"background-color:greenyellow\"></div>\r\n        <div class=\"col\" style=\"background-color:forestgreen\"></div>\r\n        <div class=\"col\" style=\"background-color:green\"></div>\r\n        <div class=\"col\" style=\"background-color:greenyellow\"></div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col\" style=\"background-color:green\">username</div>\r\n        <div class=\"col\" style=\"background-color:green\">username</div>\r\n        <div class=\"col\" style=\"background-color:green\">username</div>\r\n        <div class=\"col\" style=\"background-color:green\">username</div>\r\n        <div class=\"col\" style=\"background-color:green\">username</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

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


/***/ })

}]);
//# sourceMappingURL=modules-game-module.js.map