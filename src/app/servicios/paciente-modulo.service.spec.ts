import { TestBed } from '@angular/core/testing';

import { PacienteModuloService } from './paciente-modulo.service';

describe('PacienteModuloService', () => {
  let service: PacienteModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteModuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
