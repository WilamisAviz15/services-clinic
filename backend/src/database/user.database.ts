import db from "./db";
import User from "../models/user.model";
import DatabaseError from "./errors/database.error";
import "dotenv/config";

class UserDatabase {
  private secret_token = process.env.TOKEN_SECRET;
  async findAllUsers(): Promise<User[]> {
    const query = `
        SELECT uuid, username, userType
        FROM application_user
      `;
    const { rows } = await db.query<User>(query);
    return rows || [];
  }

  async findUserById(uuid: string): Promise<User> {
    try {
      const query = `
        SELECT uuid, username, userType
        FROM application_user
        WHERE uuid = $1
      `;
      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por ID", error);
    }
  }

  async create(user: User): Promise<string> {
    const script = `
        INSERT INTO application_user (
            username,
            password
        )
        VALUES ($1, crypt($2, $3))
        RETURNING uuid
      `;
    const values = [user.username, user.password, this.secret_token];
    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newUser] = rows;
    return newUser.uuid;
  }

  async update(user: User): Promise<void> {
    const script = `
        UPDATE application_user 
        SET
            username = $1,
            password = crypt($2, $3)
        WHERE uuid = $4
      `;
    const values = [user.username, user.password, this.secret_token, user.uuid];
    await db.query(script, values);
  }

  async remove(uuid: string): Promise<void> {
    const script = `
        DELETE 
        FROM application_user 
        WHERE uuid = $1
      `;
    const values = [uuid];
    await db.query(script, values);
  }

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const query = `
            SELECT uuid, username
            FROM application_user
            WHERE username = $1
            AND password = crypt($2, $3)
        `;
      const values = [username, password, this.secret_token];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || null;
    } catch (error) {
      throw new DatabaseError(
        "Erro na consulta por username e password",
        error
      );
    }
  }
}

export default new UserDatabase();
