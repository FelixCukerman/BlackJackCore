import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../components/game/game.component';
import { RouterModule } from '@angular/router';
var routes = [
    {
        path: ':id',
        component: GameComponent
    }
];
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule = tslib_1.__decorate([
        NgModule({
            declarations: [GameComponent],
            imports: [
                CommonModule,
                RouterModule.forChild(routes)
            ]
        })
    ], GameModule);
    return GameModule;
}());
export { GameModule };
//# sourceMappingURL=game.module.js.map