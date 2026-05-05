import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission } from "../repositories/mission.repository.js";

export const createMission = async (data: any) => {
  const missionId = await addMission(data);

  return responseFromMission({
    missionId,
    createdAt: new Date(),
  });
};
