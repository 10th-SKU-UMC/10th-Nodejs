import { pool } from "../../../db.config";
import { CreateMissionRequest } from "../dtos/mission.dto";

export const missionRepository = {

  // 미션 저장
  async createMission(data: CreateMissionRequest) {
    const query = `
      INSERT INTO missions (store_id, title, reward, deadline)
      VALUES (?, ?, ?, ?)
    `;
    const [result]: any = await pool.execute(query, [
      data.store_id,
      data.title,
      data.reward,
      data.deadline,
    ]);
    return result.insertId;
  },

  // 미션 존재 확인
  async findMissionById(mission_id: number) {
    const query = ` SELECT id FROM missions WHERE id = ?`;
    const [rows]: any = await pool.execute(query, [mission_id]);
    return rows[0];
  }
};