import { pool } from "../../../db.config.js";

// 중복 확인: 해당 멤버가 해당 미션을 'CHALLENGING' 상태로 가지고 있는지 조회
export const isMissionChallenging = async (
  memberId: number,
  missionId: number,
) => {
  const [rows]: any = await pool.query(
    "SELECT 1 FROM member_mission WHERE member_id = ? AND mission_id = ? AND status = 'CHALLENGING'",
    [memberId, missionId],
  );
  return rows.length > 0;
};

// 미션 도전 추가
export const addMemberMission = async (memberId: number, missionId: number) => {
  const conn = await pool.getConnection();
  try {
    const [result]: any = await conn.query(
      "INSERT INTO member_mission (member_id, mission_id, status) VALUES (?, ?, 'CHALLENGING')",
      [memberId, missionId],
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

// 결과 조회
export const getMemberMission = async (memberMissionId: number) => {
  const [rows]: any = await pool.query(
    "SELECT * FROM member_mission WHERE id = ?",
    [memberMissionId],
  );
  return rows[0];
};
