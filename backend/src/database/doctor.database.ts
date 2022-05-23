import db from './db';
import DatabaseError from './errors/database.error';
import 'dotenv/config';
import Doctor from '../models/doctor.model';

class DoctorDatabase {
  async findAllDoctors(): Promise<Doctor[]> {
    const query = `
        SELECT uuid, name, scholarity, balance_to_receive
        FROM application_doctor
      `;
    const { rows } = await db.query<Doctor>(query);
    return rows || [];
  }

  async findDoctorById(uuid: string): Promise<Doctor> {
    try {
      const query = `
        SELECT uuid, name, scholarity, balance_to_receive
        FROM application_doctor
        WHERE uuid = $1
      `;
      const values = [uuid];
      const { rows } = await db.query<Doctor>(query, values);
      const [doctor] = rows;
      return doctor;
    } catch (error) {
      throw new DatabaseError('Erro na consulta por ID', error);
    }
  }

  async create(doctor: Doctor): Promise<string> {
    const script = `
        INSERT INTO application_doctor(name, scholarity, balance_to_receive)
        VALUES ($1, $2, $3)
        RETURNING uuid
      `;
    const values = [doctor.name, doctor.scholarity, doctor.balance_to_receive];
    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newDoctor] = rows;
    return newDoctor.uuid;
  }

  async update(doctor: Doctor): Promise<void> {
    const script = `
        UPDATE application_doctor 
        SET name = $1, scholarity = $2
        WHERE uuid = $3
      `;
    const values = [doctor.name, doctor.scholarity, doctor.uuid];
    await db.query(script, values);
  }

  async updateValueToReceive(doctor: Doctor): Promise<void> {
    const script = `
        UPDATE application_doctor 
        SET balance_to_receive = $1
        WHERE uuid = $2
      `;
    const values = [doctor.balance_to_receive, doctor.uuid];
    await db.query(script, values);
  }

  async remove(uuid: string): Promise<void> {
    const script = `
        DELETE 
        FROM application_doctor 
        WHERE uuid = $1
      `;
    const values = [uuid];
    await db.query(script, values);
  }
}

export default new DoctorDatabase();
