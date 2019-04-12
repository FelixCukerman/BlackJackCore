import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from '../history/history.component';
var routes = [
    {
        path: 'history',
        component: HistoryComponent
    }
];
var HistoryModule = /** @class */ (function () {
    function HistoryModule() {
    }
    HistoryModule = tslib_1.__decorate([
        NgModule({
            declarations: [HistoryComponent],
            imports: [
                CommonModule,
                FormsModule,
                RouterModule.forChild(routes)
            ]
        })
    ], HistoryModule);
    return HistoryModule;
}());
export { HistoryModule };
//# sourceMappingURL=history.module.js.map