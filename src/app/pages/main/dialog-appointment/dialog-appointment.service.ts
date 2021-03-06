import { UtilService } from './../../../shared/services/util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalAppointment } from 'backend/src/models/medical.appointment.model';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Message } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';

export interface medicalServicesDetails {
  uuid?: string;
  user_id?: string;
  speciality: string;
  doctor_name: string;
  doctor_id?: string;
  value: string;
  duration: number;
  scholarity?: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogAppointmentService {
  constructor(private http: HttpClient, private utilService: UtilService) {}
  appointments$ = new BehaviorSubject<medicalServicesDetails[]>([]);

  searchMedicalServicesByDate(
    date: string
  ): Observable<medicalServicesDetails[]> {
    const req = {
      date: date,
    };
    return this.http
      .post<medicalServicesDetails[]>(
        `${environment.api}/medicalServices/medicalServicesByDate`,
        req
      )
      .pipe(take(1));
  }

  addAppointment(appointment: MedicalAppointment) {
    const req = {
      appointment: appointment,
    };
    this.http
      .post(`${environment.api}/medicalAppointment/`, req)
      .pipe(take(1))
      .subscribe((res) => {
        const response = res as Message;
        this.getAllAppointments();
        this.utilService.sendNotificationBySnackBar(response.message);
      });
  }

  deleteAllAppointments(uuidUser: string) {
    const req = {
      uuidUser: uuidUser,
    };
    this.http
      .delete(
        `${environment.api}/medicalAppointment/deleteAllByUserId/${uuidUser}`
      )
      .pipe(take(1))
      .subscribe((res) => {
        const response = res as Message;
        this.getAllAppointments();
        this.utilService.sendNotificationBySnackBar(response.message);
      });
  }

  deleteAppointment(uuidAppointment: string) {
    this.http
      .delete(`${environment.api}/medicalAppointment/${uuidAppointment}`)
      .pipe(take(1))
      .subscribe((res) => {
        const response = res as Message;
        this.getAllAppointments();
        this.utilService.sendNotificationBySnackBar(response.message);
      });
  }

  getAllAppointments(): BehaviorSubject<medicalServicesDetails[]> {
    this.http
      .get(`${environment.api}/medicalAppointment`)
      .pipe(take(1))
      .subscribe((appointments) => {
        this.appointments$.next(appointments as medicalServicesDetails[]);
      });
    return this.appointments$;
  }

  returnIndex(
    meals: MatTableDataSource<medicalServicesDetails>,
    element: any
  ): number {
    return meals.data.indexOf(element) + 1;
  }
}
