import { TestBed } from '@angular/core/testing';

import { ModuloPsicoeducativoService } from './modulo-psicoeducativo.service';

describe('ModuloPsicoeducativoService', () => {
  let service: ModuloPsicoeducativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuloPsicoeducativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
