import { DialogEmployeeComponent } from './dialog-employee/dialog-employee.component';
import { Component, OnInit } from '@angular/core';
import { User } from 'backend/src/models/user.model';
import { combineLatest, Subject, take, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogAppointmentComponent } from './dialog-appointment/dialog-appointment.component';
import { AccountService } from 'src/app/shared/services/account.service';
import { ConfirmationDialogComponent } from './dialog-appointment/confirmation-dialog/confirmation-dialog.component';
import {
  DialogAppointmentService,
  medicalServicesDetails,
} from './dialog-appointment/dialog-appointment.service';

export enum CONFIRMATION_DIALOG_TYPE {
  DELETE_APPOINTMENT = 'Tem certeza que deseja cancelar a consulta?',
  DELETE_ALL_DELETE_APPOINTMENT = 'Tem certeza que deseja cancelar todas as consultas?',
}

export enum EMPLOYEE_DIALOG_TYPE {
  CONFIRM_APPOINTMENT = 'confirmar consulta',
  SHOW_ALL_APPOINTMENT = 'todas as consultas',
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public accountService: AccountService,
    public dialogAppointmentService: DialogAppointmentService
  ) {}
  user: User = new User();
  appointments = new MatTableDataSource<medicalServicesDetails>();
  private destroy$ = new Subject<void>();
  title = CONFIRMATION_DIALOG_TYPE;
  componentType = EMPLOYEE_DIALOG_TYPE;
  displayedColumns: string[] = [
    'id',
    'speciality',
    'date',
    'doctor',
    'actions',
  ];
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    const token = this.accountService.getToken();
    const currentUser = window.localStorage.getItem('username');
    if (currentUser) {
      combineLatest([
        this.accountService.getUser(currentUser),
        this.dialogAppointmentService.getAllAppointments(),
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([user, appointments]) => {
          this.user = user[0];
          const filtereAppointments = appointments.filter(
            (a) => a.user_id == this.user.uuid
          );
          this.appointments = new MatTableDataSource(filtereAppointments);
        });
    }
  }

  removeAppointment(index?: number): void {
    if (index != undefined) {
      this.dialogAppointmentService.deleteAppointment(
        this.appointments.data[index].uuid as string
      );
    } else {
      this.appointments.data = [];
      this.dialogAppointmentService.deleteAllAppointments(
        this.user.uuid as string
      );
    }
  }

  openDialog() {
    this.dialog
      .open(DialogAppointmentComponent, {
        data: {
          userId: this.user.uuid,
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe();
  }

  openConfirmationDialog(idx?: number) {
    idx = idx != undefined ? idx : undefined;
    const title =
      idx != undefined
        ? this.title.DELETE_APPOINTMENT
        : this.title.DELETE_ALL_DELETE_APPOINTMENT;
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: { title: title, id: idx },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((response) => {
        if (response) this.removeAppointment(idx);
      });
  }

  employeeDialog(type: EMPLOYEE_DIALOG_TYPE) {
    this.dialog.open(DialogEmployeeComponent, {
      data: {
        user: this.user,
        type: type,
      },
    });
  }
}
