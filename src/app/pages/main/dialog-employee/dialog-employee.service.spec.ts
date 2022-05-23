import { TestBed } from '@angular/core/testing';

import { DialogEmployeeService } from './dialog-employee.service';

describe('DialogEmployeeService', () => {
  let service: DialogEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
