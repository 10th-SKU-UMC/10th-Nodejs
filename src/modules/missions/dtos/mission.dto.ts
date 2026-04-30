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
