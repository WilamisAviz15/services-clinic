import { MedicalAppointment } from 'backend/src/models/medical.appointment.model';
import { UtilService } from './../../../shared/services/util.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  DialogAppointmentService,
  medicalServicesDetails,
} from './dialog-appointment.service';

import * as moment from 'moment';
moment.locale('pt-br');

@Component({
  selector: 'app-dialog-appointment',
  templateUrl: './dialog-appointment.component.html',
  styleUrls: ['./dialog-appointment.component.scss'],
})
export class DialogAppointmentComponent implements OnInit {
  selectedAppointment: medicalServicesDetails = {
    user_id: '',
    speciality: '',
    doctor_name: '',
    value: '',
    duration: 0,
    date: '',
  };
  appointments: medicalServicesDetails[] = [];
  selectedDate!: Date;
  teste: medicalServicesDetails = {
    speciality: 'Dermatologia',
    doctor_name: 'Dr. José Jesus JJ',
    value: '60.00',
    duration: 10,
    date: '23/05/2022',
  };
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogAppointmentComponent>,
    private dialogAppointmentService: DialogAppointmentService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    if (this.data.editing) {
      this.selectedDate = moment(
        this.data.currentAppointment.date,
        'D/M/YYYY'
      ).toDate();
      console.log('onInit', this.data.currentAppointment);
      this.loadingAppointments(this.selectedDate);
      // this.appointments.push(this.data.currentAppointment);
      // this.selectedAppointment = this.data.currentAppointment;
      console.log(
        `${this.data.currentAppointment.speciality} - ${
          this.data.currentAppointment.doctor
        } - ${
          this.data.currentAppointment.duration
        }min - R$ ${this.data.currentAppointment.value.replace('.', ',')}`
      );
      setTimeout(() => {
        const a = this.appointments.findIndex((a) => {
          console.log(a);
          console.log(this.data.currentAppointment);
        });
        console.log(a);
      }, 1000);
      this.selectedAppointment = this.teste;
    }
  }

  updateAppointment() {}
  addAppointment() {
    const newAppointment = new MedicalAppointment();
    newAppointment.medical_service_id = this.selectedAppointment.uuid;
    newAppointment.user_id = this.data.userId;
    console.log(newAppointment);
    this.dialogAppointmentService.addAppointment(newAppointment);
    this.dialogRef.close();
  }

  loadingAppointments(date: any) {
    this.dialogAppointmentService
      .searchMedicalServicesByDate(this.utilService.formatDate(date))
      .subscribe((appointments) => {
        if (appointments.length != 0) {
          appointments.map((appointment) => {
            console.log(appointment);
            this.appointments = [];
            this.appointments.push(appointment);
          });
        } else {
          this.appointments = [];
          this.utilService.sendNotificationBySnackBar(
            'Não há consultas médicas na data escolhida.',
            5000
          );
        }
      });
  }
}
