import { TestBed } from '@angular/core/testing';

import { DialogAppointmentService } from './dialog-appointment.service';

describe('DialogAppointmentService', () => {
  let service: DialogAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
