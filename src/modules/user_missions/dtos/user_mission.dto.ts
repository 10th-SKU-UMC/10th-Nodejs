interface UserMissionResponseInput {
  userMissionId: number;
  status: string;
  createdAt: Date;
}

export const bodyToUserMission = (userId: number, missionId: number) => {
  return {
    missionId,
    userId,
  };
};

export const responseFromUserMission = ({ userMissionId, status, createdAt }: UserMissionResponseInput) => {
  return {
    user_mission_id: userMissionId,
    status,
    created_at: createdAt,
  };
};

export interface InProgressUserMissionItem {
  id: number;
  status: string | null;
  createdAt: Date | null;
  mission: {
    id: number;
    title: string;
    content: string;
    point: number;
    deadline: Date;
    store: {
      id: number;
      name: string;
    };
  };
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

export const responseFromInProgressUserMissions = (
  userMissions: InProgressUserMissionItem[]
): InProgressUserMissionListResponse => {
  const lastUserMission = userMissions[userMissions.length - 1];

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
      cursor: lastUserMission ? lastUserMission.id : null,
    },
  };
};

export const responseFromCompletedUserMission = (userMission: {
  id: number;
  status: string | null;
  createdAt: Date | null;
}) => {
  return {
    user_mission_id: userMission.id,
    status: userMission.status,
    created_at: userMission.createdAt,
  };
};
