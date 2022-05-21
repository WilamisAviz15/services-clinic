import db from "./db";
import "dotenv/config";
import MedicalServices from "../models/medical.services.model";

class MedicalServicesDatabase {
  async findAllMedicalServices(): Promise<MedicalServices[]> {
    const query = `
    select ms.uuid, ms.name speciality, ms.value, ms.duration, d.name doctor_name, d.scholarity from application_medical_services ms inner join application_doctor d on ms.doctor_id = d.uuid
      `;
    const { rows } = await db.query<MedicalServices>(query);
    return rows || [];
  }

  async create(medicalService: MedicalServices): Promise<string> {
    const script = `
        INSERT INTO application_medical_services (
            name, value, duration, doctor_id
        )
        VALUES ($1, $2,$3, $4)
        RETURNING uuid
      `;
    const values = [
      medicalService.name,
      medicalService.value,
      medicalService.duration,
      medicalService.doctorId,
    ];
    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newMedicalService] = rows;
    return newMedicalService.uuid;
  }

  async update(medicalService: MedicalServices): Promise<void> {
    const script = `
        UPDATE application_medical_services 
        SET
            name = $1,
            value = $2,
            duration = $3,
            doctor_id = $4
        WHERE uuid = $5
      `;
    const values = [
      medicalService.name,
      medicalService.value,
      medicalService.duration,
      medicalService.doctorId,
      medicalService.uuid,
    ];
    await db.query(script, values);
  }

  async remove(uuid: string): Promise<void> {
    const script = `
        DELETE 
        FROM application_medical_services 
        WHERE uuid = $1
      `;
    const values = [uuid];
    await db.query(script, values);
  }
}

export default new MedicalServicesDatabase();
