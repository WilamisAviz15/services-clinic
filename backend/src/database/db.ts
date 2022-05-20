import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.PG_URI;
const db = new Pool({ connectionString });

export default db;
