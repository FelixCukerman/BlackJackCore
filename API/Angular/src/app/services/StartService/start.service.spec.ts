import { TestBed } from '@angular/core/testing';

import { StartService } from './start.service';

describe('StartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartService = TestBed.get(StartService);
    expect(service).toBeTruthy();
  });
});
