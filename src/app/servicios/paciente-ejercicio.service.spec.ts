import { TestBed } from '@angular/core/testing';

import { PacienteEjercicioService } from './paciente-ejercicio.service';

describe('PacienteEjercicioService', () => {
  let service: PacienteEjercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteEjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
