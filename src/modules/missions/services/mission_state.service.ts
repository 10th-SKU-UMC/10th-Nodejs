import { pool } from "../../../db.config.js";
import { responseFromMissionState } from "../dtos/mission_state.dto.js";
import {
  getMissionById,
  getChallengingMission,
  addMissionState,
  getMissionState,
} from "../repositories/mission_state.repository.js";

export const challengeMission = async (data: {
  userId: number;
  missionId: number;
}) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 미션 존재 여부 검증
    const mission = await getMissionById(data.missionId);
    if (mission === null) {
      throw new Error("없는 미션입니다.");
    }

    // 이미 도전 중인지 검증
    const challenging = await getChallengingMission(data.userId, data.missionId);
    if (challenging !== null) {
      throw new Error("이미 도전 중인 미션입니다.");
    }

    // 미션 도전 추가
    const stateId = await addMissionState({
      userId: data.userId,
      missionId: data.missionId,
    });

    const missionState = await getMissionState(stateId);

    await conn.commit();
    return responseFromMissionState({ missionState, mission });

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};