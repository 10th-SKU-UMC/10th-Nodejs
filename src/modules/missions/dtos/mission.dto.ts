export interface CreateMissionRequest {
  title: string;
  content: string;
  point: number;
  deadline: string;
}

export interface MissionCreateResponse {
  mission_id: number;
  title: string;
  content: string;
  point: number;
  deadline: Date;
  createdAt: Date;
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
