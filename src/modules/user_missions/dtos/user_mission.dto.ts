// 클라이언트가 보내는 데이터
export interface CreateUserMissionRequest {
  user_id: number;      // 어떤 유저가 도전하는지
  mission_id: number;   // 어떤 미션에 도전하는지
}

// 서버가 돌려주는 데이터
export interface CreateUserMissionResponse {
  id: number;
  user_id: number;
  mission_id: number;
  status: string;       // 도전 상태 (challenging)
  created_at: Date;
}