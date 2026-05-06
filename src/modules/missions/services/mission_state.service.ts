import { prisma } from "../../../db.config.js";
import { responseFromMissionState, responseFromUserMissions } from "../dtos/mission_state.dto.js";
import {
  getMissionById,
  getChallengingMission,
  addMissionState,
  getMissionState,
  getUserAllMissions
} from "../repositories/mission_state.repository.js";

export const challengeMission = async (data: {
  userId: number;
  missionId: number;
}) => {
  // 미션 존재 여부 검증
  const mission = await getMissionById(BigInt(data.missionId));
  if (mission === null) {
    throw new Error("없는 미션입니다.");
  }

  // 이미 도전 중인지 검증
  const challenging = await getChallengingMission(data.userId, BigInt(data.missionId));
  if (challenging !== null) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 미션 도전 추가
  const missionState = await prisma.$transaction(async () => {
    const stateId = await addMissionState({
      userId: data.userId,
      missionId: BigInt(data.missionId),
    });
    return await getMissionState(stateId);
  });

  return responseFromMissionState({ missionState, mission });
};

// 유저 서비스
export const listUserMissions = async ({
  userId,
  cursor,
}: {
  userId: number;
  cursor?: number;
}) => {
  const missions = await getUserAllMissions({ userId, cursor, take: 5 });
  return responseFromUserMissions(missions);
};
