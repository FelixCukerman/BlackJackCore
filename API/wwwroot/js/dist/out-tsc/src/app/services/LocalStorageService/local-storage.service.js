import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from 'ngx-webstorage-service';
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService(storage) {
        this.storage = storage;
        this.STORAGE_KEY = 'local_todolist';
    }
    LocalStorageService.prototype.UpdateState = function (state) {
        this.storage.set(this.STORAGE_KEY, state);
    };
    LocalStorageService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(LOCAL_STORAGE)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], LocalStorageService);
    return LocalStorageService;
}());
export { LocalStorageService };
//# sourceMappingURL=local-storage.service.js.map