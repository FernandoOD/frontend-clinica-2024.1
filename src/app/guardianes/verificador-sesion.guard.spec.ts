import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verificadorSesionGuard } from './verificador-sesion.guard';

describe('verificadorSesionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verificadorSesionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
