import { pool } from "../config/db.js";

export async function findByCode(code) {
  const result = await pool.query(
    "SELECT * FROM links WHERE code = $1",
    [code]
  );
  return result.rows[0];
}

export async function createLink({ code, url }) {
  const result = await pool.query(
    `INSERT INTO links (code, url) 
     VALUES ($1, $2)
     RETURNING code, url`,
    [code, url]
  );
  return result.rows[0];
}


