import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'backend/src/models/user.model';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';
import {
  DialogAppointmentService,
  medicalServicesDetails,
} from '../main/dialog-appointment/dialog-appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  appointments = new MatTableDataSource<medicalServicesDetails>();
  private destroy$ = new Subject<void>();
  user: User = new User();
  displayedColumns: string[] = [
    'id',
    'speciality',
    'date',
    'doctor',
    'used',
    'paid',
    'actions',
  ];
  constructor(
    public accountService: AccountService,
    public dialogAppointmentService: DialogAppointmentService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    const token = this.accountService.getToken();
    console.log('token:', token);
    const currentUser = window.localStorage.getItem('username');
    if (currentUser) {
      console.log('current', currentUser);
      combineLatest([
        this.accountService.getUser(currentUser),
        this.dialogAppointmentService.getAllAppointments(),
      ])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([user, appointments]) => {
          this.user = user[0];
          console.log(this.user);
          const filtereAppointments = appointments.filter(
            (a) => a.user_id == this.user.uuid
          );
          console.log(filtereAppointments);
          this.appointments = new MatTableDataSource(filtereAppointments);
        });
    }
  }
}
