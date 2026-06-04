import {
  CompletedUserMissionResponse,
  InProgressUserMissionListResponse,
  UserMissionCreateResponse,
} from "../dtos/user_mission.dto.js";
import { addUserMission, getUserMissionByMissionId } from "../../missions/repositories/mission.repository.js";
import {
  completeUserMission,
  getInProgressUserMissions,
} from "../repositories/user_mission.repository.js";
import {
  DuplicateUserMissionError,
  InProgressUserMissionNotFoundError,
} from "../../../common/errors/error.js";

export const createUserMission = async (
  userId: number,
  missionId: number,
): Promise<UserMissionCreateResponse> => {
  const existingMission = await getUserMissionByMissionId(missionId, userId);

  if (existingMission) {
    throw new DuplicateUserMissionError(userId, missionId);
  }

  const userMissionId = await addUserMission(missionId, userId);

  return {
    user_mission_id: userMissionId,
    status: "IN_PROGRESS",
    created_at: new Date(),
  };
};

export const listInProgressUserMissions = async (
  userId: number,
  cursor: number
): Promise<InProgressUserMissionListResponse> => {
  const userMissions = await getInProgressUserMissions(userId, cursor);
  const lastUserMission = userMissions.at(-1);

  return {
    data: userMissions.map((userMission) => ({
      userMissionId: userMission.id,
      status: userMission.status,
      createdAt: userMission.createdAt,
      mission: {
        missionId: userMission.mission.id,
        title: userMission.mission.title,
        content: userMission.mission.content,
        point: userMission.mission.point,
        deadline: userMission.mission.deadline,
        store: {
          storeId: userMission.mission.store.id,
          name: userMission.mission.store.name,
        },
      },
    })),
    pagination: {
      cursor: lastUserMission?.id ?? null,
    },
  };
};

export const completeInProgressUserMission = async (
  userId: number,
  missionId: number,
): Promise<CompletedUserMissionResponse> => {
  const completedUserMission = await completeUserMission(userId, missionId);

  if (!completedUserMission) {
    throw new InProgressUserMissionNotFoundError(userId, missionId);
  }

  return {
    user_mission_id: completedUserMission.id,
    status: completedUserMission.status,
    created_at: completedUserMission.createdAt,
  };
};
