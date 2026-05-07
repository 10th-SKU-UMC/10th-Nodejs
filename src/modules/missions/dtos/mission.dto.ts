export interface CreateMissionRequest {
  title: string;
  content: string;
  point: number;
  deadline: string;
}

export const bodyToMission = (body: CreateMissionRequest, storeId: number) => {
  return {
    storeId,
    title: body.title,
    content: body.content,
    point: body.point,
    deadline: new Date(body.deadline),
  };
};

interface MissionResponseInput {
  missionId: number;
  createdAt: Date;
}

export const responseFromMission = ({ missionId, createdAt }: MissionResponseInput) => {
  return {
    mission_id: missionId,
    created_at: createdAt,
  };
};

export interface MissionItem {
  id: number;
  title: string;
  content: string;
  point: number;
  deadline: Date;
  createdAt: Date | null;
}

export interface MissionListResponse {
  data: {
    missionId: number;
    title: string;
    content: string;
    point: number;
    deadline: Date;
    createdAt: Date | null;
  }[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromMissions = (
  missions: MissionItem[]
): MissionListResponse => {
  const lastMission = missions[missions.length - 1];

  return {
    data: missions.map((mission) => ({
      missionId: mission.id,
      title: mission.title,
      content: mission.content,
      point: mission.point,
      deadline: mission.deadline,
      createdAt: mission.createdAt,
    })),
    pagination: {
      cursor: lastMission ? lastMission.id : null,
    },
  };
};
