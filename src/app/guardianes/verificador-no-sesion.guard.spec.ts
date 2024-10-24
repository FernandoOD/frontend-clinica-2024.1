import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verificadorNoSesionGuard } from './verificador-no-sesion.guard';

describe('verificadorNoSesionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verificadorNoSesionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
