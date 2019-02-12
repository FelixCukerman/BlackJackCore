import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
describe('GameService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GameService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=game.service.spec.js.map