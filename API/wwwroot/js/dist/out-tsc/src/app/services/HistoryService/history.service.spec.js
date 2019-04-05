import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';
describe('HistoryService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(HistoryService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=history.service.spec.js.map