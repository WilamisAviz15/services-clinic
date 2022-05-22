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

@Component({
  selector: 'app-dialog-appointment',
  templateUrl: './dialog-appointment.component.html',
  styleUrls: ['./dialog-appointment.component.scss'],
})
export class DialogAppointmentComponent implements OnInit {
  selectedAppointment: medicalServicesDetails = {
    speciality: '',
    doctor_name: '',
    value: '',
    duration: 0,
    date: '',
  };
  appointments: medicalServicesDetails[] = [];
  selectedDate!: Date;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogAppointmentComponent>,
    private dialogAppointmentService: DialogAppointmentService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

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
