import { TestBed } from '@angular/core/testing';

import { PacienteTerapeutaService } from './paciente-terapeuta.service';

describe('PacienteTerapeutaService', () => {
  let service: PacienteTerapeutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteTerapeutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
