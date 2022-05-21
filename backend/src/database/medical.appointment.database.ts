import db from "./db";
import "dotenv/config";
import MedicalAppointment from "../models/medical.appointment.model";

class MedicalAppointmentDatabase {
  async findAllMedicalAppointments(): Promise<MedicalAppointment[]> {
    const query = `
    SELECT ma.uuid, u.username patient_name, ms.name speciality, ms.value value_to_paid, 
    ms.duration duration
    FROM application_user u 
    INNER JOIN application_medical_appointment ma ON u.uuid= ma.user_id
    INNER JOIN application_medical_services ms ON ma.medical_service_id = ms.uuid
      `;
    const { rows } = await db.query<MedicalAppointment>(query);
    return rows || [];
  }

  async findMedicalAppointmentsByUserId(
    uuid: string
  ): Promise<MedicalAppointment[]> {
    const query = `
    SELECT ma.uuid, u.username, ms.name, ms.value, ms.duration
    FROM application_user u 
    INNER JOIN application_medical_appointment ma ON u.uuid= ma.user_id
    INNER JOIN application_medical_services ms ON ma.medical_service_id = ms.uuid
    WHERE u.uuid = $1
      `;
    const values = [uuid];
    const { rows } = await db.query<MedicalAppointment>(query, values);
    return rows || [];
  }

  async create(medicalAppointment: MedicalAppointment): Promise<string> {
    const script = `
    INSERT INTO application_medical_appointment(user_id, medical_service_id) 
        VALUES ($1, $2)
        RETURNING uuid
      `;
    const values = [
      medicalAppointment.userId,
      medicalAppointment.medicalServiceId,
    ];
    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newmedicalAppointment] = rows;
    return newmedicalAppointment.uuid;
  }

  async update(medicalAppointment: MedicalAppointment): Promise<void> {
    const script = `
        UPDATE application_medical_appointment 
        SET
            user_id = $1,
            medical_service_id = $2,
        WHERE uuid = $3
      `;
    const values = [
      medicalAppointment.userId,
      medicalAppointment.medicalServiceId,
      medicalAppointment.uuid,
    ];
    await db.query(script, values);
  }

  async remove(uuid: string): Promise<void> {
    const script = `
        DELETE 
        FROM application_medical_appointment 
        WHERE uuid = $1
      `;
    const values = [uuid];
    await db.query(script, values);
  }
}

export default new MedicalAppointmentDatabase();
