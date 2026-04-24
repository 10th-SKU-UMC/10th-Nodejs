import { pool } from "../../../db.config";
import { CreateUserMissionRequest } from "../dtos/user_mission.dto";

export const userMissionRepository = {

  // 이미 도전 중인지 확인
  async findChallengingMission(user_id: number, mission_id: number) {
    const query = `
      SELECT id FROM user_missions
      WHERE user_id = ? AND mission_id = ? AND status = 'challenging'
    `;
    const [rows]: any = await pool.execute(query, [user_id, mission_id]);
    return rows[0]; // 있으면 반환, 없으면 undefined
  },

  // 도전 미션 저장
  async createUserMission(data: CreateUserMissionRequest) {
    const query = `
      INSERT INTO user_missions (user_id, mission_id, status)
      VALUES (?, ?, 'challenging')
    `;
    const [result]: any = await pool.execute(query, [
      data.user_id,
      data.mission_id,
    ]);
    return result.insertId;
  },
};