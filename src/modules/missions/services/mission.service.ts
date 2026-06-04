import {
  CreateMissionRequest,
  MissionCreateResponse,
  MissionListResponse,
} from "../dtos/mission.dto.js";
import { addMission, getStoreMissions } from "../repositories/mission.repository.js";

export const createMission = async (
  storeId: number,
  data: CreateMissionRequest,
): Promise<MissionCreateResponse> => {
  const mission = await addMission({
    storeId,
    title: data.title,
    content: data.content,
    point: data.point,
    deadline: new Date(data.deadline),
  });

  return <MissionCreateResponse>{
    mission_id: mission.id,
    title: mission.title,
    content: mission.content,
    point: mission.point,
    deadline: mission.deadline,
    createdAt: mission.createdAt,
  };
};

export const listStoreMissions = async (
  storeId: number,
  cursor: number
): Promise<MissionListResponse> => {
  const missions = await getStoreMissions(storeId, cursor);
  const lastMission = missions.at(-1);

  return <MissionListResponse>{
    data: missions.map((mission) => ({
      missionId: mission.id,
      title: mission.title,
      content: mission.content,
      point: mission.point,
      deadline: mission.deadline,
      createdAt: mission.createdAt,
    })),
    pagination: {
      cursor: lastMission?.id ?? null,
    },
  };
};
