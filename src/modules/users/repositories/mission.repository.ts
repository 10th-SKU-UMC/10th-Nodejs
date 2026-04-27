import { pool } from "../../../db.config.js";
import { ResultSetHeader } from "mysql2";

// 미션 추가 쿼리
// 미션 추가 쿼리 수정
export const addMission = async (restaurantId: number, data: any) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO mission (restaurant_id, prcie, point, passkey) VALUES (?, ?, ?, ?)",
      [restaurantId, data.prcie, data.point, data.passkey],
    );
    return (result as any).insertId;
  } finally {
    conn.release();
  }
};
// 미션 상세 조회 쿼리
export const getMission = async (missionId: number) => {
  const [rows]: any = await pool.query("SELECT * FROM mission WHERE id = ?", [
    missionId,
  ]);
  return rows[0];
};
