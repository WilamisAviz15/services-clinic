import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Doctor from 'backend/src/models/doctor.model';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DialogInvoiceService {
  private doctors$ = new BehaviorSubject<Doctor[]>([]);
  constructor(private http: HttpClient) {}

  getAllDoctors(): BehaviorSubject<Doctor[]> {
    this.http
      .get(`${environment.api}/doctors/`)
      .pipe(take(1))
      .subscribe((doctors) => {
        this.doctors$.next(doctors as Doctor[]);
      });
    return this.doctors$;
  }
}
