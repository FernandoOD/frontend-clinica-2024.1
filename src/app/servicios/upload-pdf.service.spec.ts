import { TestBed } from '@angular/core/testing';

import { UploadPdfService } from './upload-pdf.service';

describe('UploadPdfService', () => {
  let service: UploadPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
