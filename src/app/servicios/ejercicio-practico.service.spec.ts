import { TestBed } from '@angular/core/testing';

import { EjercicioPracticoService } from './ejercicio-practico.service';

describe('EjercicioPracticoService', () => {
  let service: EjercicioPracticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioPracticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
