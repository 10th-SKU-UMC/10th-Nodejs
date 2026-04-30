import { responseFromUserMission } from "../dtos/user_mission.dto.js";
import { addUserMission, getUserMissionByMissionId } from "../../missions/repositories/mission.repository.js";

export const createUserMission = async (data: any) => {
  const existingMission = await getUserMissionByMissionId(data.missionId, data.userId);

  if (existingMission) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const userMissionId = await addUserMission(data.missionId, data.userId);

  return responseFromUserMission({
    userMissionId,
    status: "PROGRESS",
    createdAt: new Date(),
  });
};
