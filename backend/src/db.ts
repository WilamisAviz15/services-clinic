import { Pool } from "pg";

const connectionString =
  "postgres://mjsandof:4Exdovqyd7QYlsZ3TfZ2qy5ZkcKYuFcY@drona.db.elephantsql.com/mjsandof";
const db = new Pool({ connectionString });

export default db;
