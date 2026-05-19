export interface UserMissionCreateResponse {
  user_mission_id: number;
  status: string;
  created_at: Date;
}

export interface InProgressUserMissionListResponse {
  data: {
    userMissionId: number;
    status: string | null;
    createdAt: Date | null;
    mission: {
      missionId: number;
      title: string;
      content: string;
      point: number;
      deadline: Date;
      store: {
        storeId: number;
        name: string;
      };
    };
  }[];
  pagination: {
    cursor: number | null;
  };
}

export interface CompletedUserMissionResponse {
  user_mission_id: number;
  status: string | null;
  created_at: Date | null;
}
