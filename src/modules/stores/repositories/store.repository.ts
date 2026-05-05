import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addStore = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO store (region_id, category_id, name, address, status) VALUES (?, ?, ?, ?, ?);`,
      [data.regionId, data.categoryId, data.name, data.address, data.status]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getStoreById = async (storeId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [stores] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE id = ?;`,
      [storeId]
    );

    return stores[0] ?? null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
