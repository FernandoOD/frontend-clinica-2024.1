import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verificadorPacienteGuard } from './verificador-paciente.guard';

describe('verificadorPacienteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verificadorPacienteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
