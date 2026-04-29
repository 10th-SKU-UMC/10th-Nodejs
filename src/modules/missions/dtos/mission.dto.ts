export interface MissionCreateRequest {
  detail: string;
  point: number;
  storeName: string;
}

export const bodyToMission = (body: MissionCreateRequest) => {
  return {
    detail: body.detail,
    point: body.point,
    storeName: body.storeName,
  };
};

export interface MissionCreateResponse {
  missionId: number;
  detail: string;
  point: number;
  storeId: number;
  storeName: string;
}

export const responseFromMission = ({
  mission,
  store,
}: {
  mission: any;
  store: any;
}): MissionCreateResponse => {
  return {
    missionId: mission.mission_id,
    detail: mission.detail,
    point: mission.point,
    storeId: store.store_id,
    storeName: store.name,
  };
};