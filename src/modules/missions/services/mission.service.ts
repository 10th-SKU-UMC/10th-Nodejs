import {
  MissionListResponse,
  responseFromMission,
  responseFromMissions,
} from "../dtos/mission.dto.js";
import { addMission, getStoreMissions } from "../repositories/mission.repository.js";

export const createMission = async (data: any) => {
  const missionId = await addMission(data);

  return responseFromMission({
    missionId,
    createdAt: new Date(),
  });
};

export const listStoreMissions = async (
  storeId: number,
  cursor: number
): Promise<MissionListResponse> => {
  const missions = await getStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};
