import {
  InProgressUserMissionListResponse,
  responseFromCompletedUserMission,
  responseFromInProgressUserMissions,
  responseFromUserMission,
} from "../dtos/user_mission.dto.js";
import { addUserMission, getUserMissionByMissionId } from "../../missions/repositories/mission.repository.js";
import {
  completeUserMission,
  getInProgressUserMissions,
} from "../repositories/user_mission.repository.js";

export const createUserMission = async (data: any) => {
  const existingMission = await getUserMissionByMissionId(data.missionId, data.userId);

  if (existingMission) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const userMissionId = await addUserMission(data.missionId, data.userId);

  return responseFromUserMission({
    userMissionId,
    status: "IN_PROGRESS",
    createdAt: new Date(),
  });
};

export const listInProgressUserMissions = async (
  userId: number,
  cursor: number
): Promise<InProgressUserMissionListResponse> => {
  const userMissions = await getInProgressUserMissions(userId, cursor);
  return responseFromInProgressUserMissions(userMissions);
};

export const completeInProgressUserMission = async (userId: number, missionId: number) => {
  const completedUserMission = await completeUserMission(userId, missionId);

  if (!completedUserMission) {
    throw new Error("진행 중인 미션이 존재하지 않습니다.");
  }

  return responseFromCompletedUserMission(completedUserMission);
};
