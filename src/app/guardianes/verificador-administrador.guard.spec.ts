import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verificadorAdministradorGuard } from './verificador-administrador.guard';

describe('verificadorAdministradorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verificadorAdministradorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
