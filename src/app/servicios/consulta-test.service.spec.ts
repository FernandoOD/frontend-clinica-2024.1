import { TestBed } from '@angular/core/testing';

import { ConsultaTestService } from './consulta-test.service';

describe('ConsultaTestService', () => {
  let service: ConsultaTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
