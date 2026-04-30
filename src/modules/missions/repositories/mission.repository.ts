import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addMission = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO mission (store_id, title, content, point, deadline) VALUES (?, ?, ?, ?, ?);`,
      [data.storeId, data.title, data.content, data.point, data.deadline]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const getUserMissionByMissionId = async (missionId: number, userId: number): Promise<any | null> => {
  const conn = await pool.getConnection();

  try {
    const [missions] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM user_mission WHERE mission_id = ? AND user_id = ? AND status = 'PROGRESS';`,
      [missionId, userId]
    );

    return missions[0] ?? null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

export const addUserMission = async (missionId: number, userId: number): Promise<number> => {
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO user_mission (mission_id, user_id, status) VALUES (?, ?, 'PROGRESS');`,
      [missionId, userId]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};
