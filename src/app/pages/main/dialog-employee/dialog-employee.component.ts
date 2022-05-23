import { DialogInvoiceComponent } from './../dialog-invoice/dialog-invoice.component';
import { DialogEmployeeService } from './dialog-employee.service';
import { medicalServicesDetails } from './../dialog-appointment/dialog-appointment.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EMPLOYEE_DIALOG_TYPE } from '../main.component';
import { Subject, takeUntil, map, take, BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Doctor from 'backend/src/models/doctor.model';
import { DialogInvoiceService } from '../dialog-invoice/dialog-invoice.service';

interface valueToReceive {
  name: string;
  scholarity: string;
  uuid: string;
  balance_to_receive: string;
}

@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.scss'],
})
export class DialogEmployeeComponent implements OnInit, OnDestroy {
  componentType!: EMPLOYEE_DIALOG_TYPE;
  type = EMPLOYEE_DIALOG_TYPE;
  cpfToSearch = '';
  appointments = new MatTableDataSource<medicalServicesDetails>();
  ttl = '0,00';
  duration = 0;
  commission: Doctor[] = [];
  toReceive: valueToReceive[] = [];
  displayedColumns: string[] = [
    'speciality',
    'duration',
    'date',
    'doctor',
    'value',
  ];
  private destroy$ = new Subject<void>();
  doctors$ = new BehaviorSubject<Doctor[]>([]);
  constructor(
    public dialogRef: MatDialogRef<DialogEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogEmployeeService: DialogEmployeeService,
    public dialog: MatDialog,
    private dialogInvoiceService: DialogInvoiceService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.componentType = this.data.type;
    this.doctors$ = this.dialogInvoiceService.getAllDoctors();
  }

  searchUser() {
    this.dialogEmployeeService
      .getUserByCPF(this.cpfToSearch)
      .pipe(takeUntil(this.destroy$))
      .subscribe((appointments) => {
        this.commission = [];
        this.duration = appointments.reduce((acc, v) => acc + v.duration, 0);
        this.ttl = appointments
          .reduce((acc, v) => (acc += +v.value), 0)
          .toFixed(2)
          .toString();
        appointments.map((appointment) => {
          const obj: Doctor = {
            uuid: appointment.doctor_id as string,
            balance_to_receive: (+appointment.value * 0.1)
              .toFixed(2)
              .toString(),
            name: appointment.doctor_name,
            scholarity: appointment.scholarity as string,
          };
          this.commission.push(obj);
        });

        this.appointments = new MatTableDataSource(appointments);
      });
  }

  finishAppointment() {
    this.commission.map((v) => {
      const result = this.toReceive.findIndex((t) => t.uuid == v.uuid);
      if (result == -1) {
        const arr: valueToReceive = {
          name: v.name,
          scholarity: v.scholarity,
          uuid: v.uuid as string,
          balance_to_receive: v.balance_to_receive,
        };
        this.toReceive.push(arr);
      } else {
        const arr: valueToReceive = {
          name: this.toReceive[result].name,
          scholarity: this.toReceive[result].scholarity,
          uuid: this.toReceive[result].uuid,
          balance_to_receive: (
            +this.toReceive[result].balance_to_receive + +v.balance_to_receive
          )
            .toFixed(2)
            .toString(),
        };
        this.toReceive[result] = arr;
      }
    });

    this.toReceive.map((doctor) => {
      const doc: Doctor = {
        uuid: doctor.uuid,
        name: doctor.name,
        scholarity: doctor.scholarity,
        balance_to_receive: doctor.balance_to_receive,
      };
      setTimeout(() => {
        this.dialogEmployeeService.updateDoctorCommission(doc);
      }, 1000);
    });

    this.toReceive = [];

    setTimeout(() => {
      this.dialogRef.close();
      this.dialog.open(DialogInvoiceComponent, {
        data: {
          cpf: this.cpfToSearch,
        },
      });
    }, 1200);
  }
}
