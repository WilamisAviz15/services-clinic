import { DialogInvoiceService } from './dialog-invoice.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { medicalServicesDetails } from '../dialog-appointment/dialog-appointment.service';
import { DialogEmployeeService } from '../dialog-employee/dialog-employee.service';
import Doctor from 'backend/src/models/doctor.model';

@Component({
  selector: 'app-dialog-invoice',
  templateUrl: './dialog-invoice.component.html',
  styleUrls: ['./dialog-invoice.component.scss'],
})
export class DialogInvoiceComponent implements OnInit {
  ttl = '';
  appointments = new MatTableDataSource<medicalServicesDetails>();
  doctors = new MatTableDataSource<Doctor>();
  clientName = '';
  doctorId: string[] = [];
  displayedColumns: string[] = [
    'speciality',
    'duration',
    'date',
    'doctor',
    'value',
  ];
  duration = 0;

  displayedColumnsDoctors: string[] = ['name', 'value'];
  constructor(
    public dialogRef: MatDialogRef<DialogInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogEmployeeService: DialogEmployeeService,
    private dialogInvoiceService: DialogInvoiceService
  ) {}

  ngOnInit(): void {
    this.dialogEmployeeService
      .getUserByCPF(this.data.cpf)
      .pipe(take(1))
      .subscribe((appointments) => {
        appointments.map((app) => {
          this.doctorId.push(app.doctor_id as string);
        });
        this.duration = appointments.reduce((acc, v) => acc + v.duration, 0);
        this.ttl = appointments
          .reduce((acc, v) => (acc += +v.value), 0)
          .toFixed(2)
          .toString();
        this.appointments = new MatTableDataSource(appointments);
      });

    this.dialogInvoiceService
      .getAllDoctors()
      .pipe(take(2))
      .subscribe((doctors) => {
        const filteredDoctors = doctors.filter((doctor) => {
          return this.doctorId.find((d) => d === doctor.uuid);
        });
        this.doctors = new MatTableDataSource(filteredDoctors);
      });
  }
}
