import db from "./db";
import "dotenv/config";
import MedicalServices from "../models/medical.services.model";

class MedicalServicesDatabase {
  async findAllMedicalServices(): Promise<MedicalServices[]> {
    const query = `
        SELECT uuid, name, value, duration
        FROM application_medical_services
      `;
    const { rows } = await db.query<MedicalServices>(query);
    return rows || [];
  }

  async create(medicalService: MedicalServices): Promise<string> {
    const script = `
        INSERT INTO application_medical_services (
            name, value, duration
        )
        VALUES ($1, $2,$3)
        RETURNING uuid
      `;
    const values = [
      medicalService.name,
      medicalService.value,
      medicalService.duration,
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
            duration = $3
        WHERE uuid = $4
      `;
    const values = [
      medicalService.name,
      medicalService.value,
      medicalService.duration,
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
