import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

export type Message = {
  message: string;
  err?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private _snackBar: MatSnackBar) {}

  formatDate(date: Date): string {
    return moment(date).format('DD/MM/YYYY');
  }

  sendNotificationBySnackBar(message: string, duration: number = 2000) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: message,
      },
      duration: duration,
    });
  }
}
