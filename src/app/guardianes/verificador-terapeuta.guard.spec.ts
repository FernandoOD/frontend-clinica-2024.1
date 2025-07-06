import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verificadorTerapeutaGuard } from './verificador-terapeuta.guard';

describe('verificadorTerapeutaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verificadorTerapeutaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
