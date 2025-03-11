import { TestBed } from '@angular/core/testing';

import { RespuestasRelevantesService } from './respuestas-relevantes.service';

describe('RespuestasRelevantesService', () => {
  let service: RespuestasRelevantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestasRelevantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
