import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartModule } from './components/start/start.module';
import { GameModule } from './components/game/game.module';
import { HistoryModule } from './components/history/history.module';
var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'game/start'
    },
    {
        path: 'game',
        loadChildren: function () { return StartModule; }
    },
    {
        path: '',
        loadChildren: function () { return HistoryModule; }
    },
    {
        path: 'game',
        loadChildren: function () { return GameModule; }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map