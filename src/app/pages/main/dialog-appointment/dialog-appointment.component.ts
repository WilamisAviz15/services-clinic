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
  selectedAppointment: string = '';
  selectedDoctor: string = '';
  detailsAppointment = {
    uuid: '',
    value: '',
    duration: 0,
  };
  appointments: medicalServicesDetails[] = [];
  doctors: any[] = [];
  selectedDate!: Date;
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
      this.loadingAppointments(this.selectedDate);
      setTimeout(() => {
        this.selectedAppointment = this.data.currentAppointment.speciality;
        // this.selectedDoctor = this.data.currentAppointment.doctor;
      }, 2000);
    }
  }

  updateAppointment() {}
  addAppointment() {
    const newAppointment = new MedicalAppointment();
    newAppointment.medical_service_id = this.detailsAppointment.uuid;
    newAppointment.user_id = this.data.userId;
    this.dialogAppointmentService.addAppointment(newAppointment);
    this.dialogRef.close();
  }

  loadingAppointments(date: any) {
    this.dialogAppointmentService
      .searchMedicalServicesByDate(this.utilService.formatDate(date))
      .subscribe((appointments) => {
        if (appointments.length != 0) {
          appointments.map((appointment) => {
            this.appointments = [];
            this.appointments.push(appointment);
            this.doctors.push({
              uuid: appointment.uuid,
              name: appointment.doctor_name,
              value: appointment.value.replace('.', ','),
              duration: appointment.duration,
            });
          });
        } else {
          this.appointments = [];
          this.doctors = [];
          this.utilService.sendNotificationBySnackBar(
            'Não há consultas médicas na data escolhida.',
            5000
          );
        }
      });
  }

  getDetailsAppointments(event: any) {
    this.detailsAppointment.duration = event.duration;
    this.detailsAppointment.value = event.value;
    this.detailsAppointment.uuid = event.uuid;
  }
}
