import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 가게 이름으로 가게 조회
export const getStoreByName = async (storeName: string): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE name = ? LIMIT 1;`,
      [storeName]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 추가
export const addMission = async (data: {
  detail: string;
  point: number;
  storeId: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO mission (detail, point, store_id)
       VALUES (?, ?, ?);`,
      [data.detail, data.point, data.storeId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 조회
export const getMission = async (missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE mission_id = ?;`,
      [missionId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};