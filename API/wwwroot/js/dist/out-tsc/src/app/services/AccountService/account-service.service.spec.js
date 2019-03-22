import { TestBed } from '@angular/core/testing';
import { AccountService } from './account-service.service';
describe('AccountServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AccountService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=account-service.service.spec.js.map