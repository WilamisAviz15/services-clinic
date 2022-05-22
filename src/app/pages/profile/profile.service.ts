import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'backend/src/models/user.model';
import { take } from 'rxjs';
import { Message, UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  updateProfile(user: User): void {
    const req = {
      user: user,
    };
    this.http
      .put(`${environment.api}/users/${user.uuid}`, req)
      .pipe(take(1))
      .subscribe((res) => {
        const response = res as Message;
        this.utilService.sendNotificationBySnackBar(response.message);
      });
  }
}
