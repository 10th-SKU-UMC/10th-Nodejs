export interface MissionStateCreateRequest {
  userId: number;
  missionId: number;
}

export const bodyToMissionState = (body: MissionStateCreateRequest) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
  };
};

export interface MissionStateCreateResponse {
  stateId: number;
  userId: number;
  missionId: number;
  missionDetail: string;
  point: number;
  state: string;
}

export const responseFromMissionState = ({
  missionState,
  mission,
}: {
  missionState: any;
  mission: any;
}): MissionStateCreateResponse => {
  return {
    stateId: missionState.state_id,
    userId: missionState.user_id,
    missionId: mission.mission_id,
    missionDetail: mission.detail,
    point: mission.point,
    state: missionState.state,
  };
};