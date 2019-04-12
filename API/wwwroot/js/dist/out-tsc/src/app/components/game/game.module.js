import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
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
                FormsModule,
                StorageServiceModule,
                RouterModule.forChild(routes)
            ]
        })
    ], GameModule);
    return GameModule;
}());
export { GameModule };
//# sourceMappingURL=game.module.js.map