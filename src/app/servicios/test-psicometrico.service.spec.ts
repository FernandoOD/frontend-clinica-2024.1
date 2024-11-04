import { TestBed } from '@angular/core/testing';

import { TestPsicometricoService } from './test-psicometrico.service';

describe('TestPsicometricoService', () => {
  let service: TestPsicometricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestPsicometricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
