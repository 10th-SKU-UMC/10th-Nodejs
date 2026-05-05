// 클라이언트가 미션 도전을 요청할 때 보내는 데이터 (Request)
export interface MissionChallengeRequest {
  memberId: number; // 어떤 유저가 도전하는지
}

// 서버가 미션 도전 결과를 응답할 때 보내는 데이터 (Response)
export interface MissionChallengeResponse {
  memberMissionId: number;
  memberId: number;
  missionId: number;
  status: string;
  createdAt?: Date; // 생성 시간 (필요 시)
}
