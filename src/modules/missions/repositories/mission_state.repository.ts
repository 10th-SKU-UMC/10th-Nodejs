import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 미션 ID로 미션 조회
export const getMissionById = async (missionId: number): Promise<any | null> => {
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

// 이미 도전 중인 미션인지 확인
export const getChallengingMission = async (
  userId: number,
  missionId: number
): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM mission_state 
       WHERE user_id = ? AND mission_id = ? AND state = '도전중'
       LIMIT 1;`,
      [userId, missionId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 도전 추가
export const addMissionState = async (data: {
  userId: number;
  missionId: number;
}): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO mission_state (user_id, mission_id, state)
       VALUES (?, ?, '도전중');`,
      [data.userId, data.missionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};

// 미션 상태 조회
export const getMissionState = async (stateId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT * FROM mission_state WHERE state_id = ?;`,
      [stateId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  } finally {
    conn.release();
  }
};