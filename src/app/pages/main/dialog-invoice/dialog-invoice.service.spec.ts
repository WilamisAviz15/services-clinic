import { TestBed } from '@angular/core/testing';

import { DialogInvoiceService } from './dialog-invoice.service';

describe('DialogInvoiceService', () => {
  let service: DialogInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
