import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './account/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { DialogAppointmentComponent } from './pages/main/dialog-appointment/dialog-appointment.component';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutenticationComponent } from './account/autentication/autentication.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './pages/main/dialog-appointment/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AutenticationComponent,
    MainComponent,
    DialogAppointmentComponent,
    SnackBarComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
