import { TestBed } from '@angular/core/testing';

import { NotaClinicaService } from './nota-clinica.service';

describe('NotaClinicaService', () => {
  let service: NotaClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
