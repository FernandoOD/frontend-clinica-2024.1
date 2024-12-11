import { TestBed } from '@angular/core/testing';

import { ConsultaResultadoTestService } from './consulta-resultado-test.service';

describe('ConsultaResultadoTestService', () => {
  let service: ConsultaResultadoTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaResultadoTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
