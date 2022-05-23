import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Doctor from 'backend/src/models/doctor.model';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { medicalServicesDetails } from '../dialog-appointment/dialog-appointment.service';

@Injectable({
  providedIn: 'root',
})
export class DialogEmployeeService {
  appointments$ = new BehaviorSubject<medicalServicesDetails[]>([]);
  constructor(private http: HttpClient) {}

  getUserByCPF(cpf: string): BehaviorSubject<medicalServicesDetails[]> {
    this.http
      .get(`${environment.api}/medicalAppointment/byCPF/${cpf}`)
      .pipe(take(1))
      .subscribe((app) => {
        this.appointments$.next(app as medicalServicesDetails[]);
      });
    return this.appointments$;
  }

  updateDoctorCommission(doctor: Doctor) {
    const req = {
      doctor: doctor,
    };
    this.http
      .put(`${environment.api}/doctors/valueToReceive/${doctor.uuid}`, doctor)
      .pipe(take(1))
      .subscribe();
  }
}
