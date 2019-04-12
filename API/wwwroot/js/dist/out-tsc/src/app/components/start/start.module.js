import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from '../start/start.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
var routes = [
    {
        path: 'start',
        component: StartComponent
    }
];
var StartModule = /** @class */ (function () {
    function StartModule() {
    }
    StartModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                StartComponent
            ],
            imports: [
                CommonModule,
                StorageServiceModule,
                FormsModule,
                RouterModule.forChild(routes)
            ]
        })
    ], StartModule);
    return StartModule;
}());
export { StartModule };
//# sourceMappingURL=start.module.js.map