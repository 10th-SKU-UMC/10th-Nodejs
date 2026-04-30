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
