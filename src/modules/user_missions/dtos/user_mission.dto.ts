// 클라이언트가 보내는 데이터 (user_id는 JWT 토큰에서 추출 → body에서 받지 않음)
export interface CreateUserMissionBody {
  mission_id: number;   // 어떤 미션에 도전하는지
}

// 서비스/레포지토리 내부에서 사용하는 타입 (user_id 포함)
export interface CreateUserMissionRequest {
  user_id: number;      // JWT에서 추출한 로그인 유저 ID
  mission_id: number;
}

// 서버가 돌려주는 데이터
export interface CreateUserMissionResponse {
  id: number;
  user_id: number;
  mission_id: number;
  status: string;       // 도전 상태 (challenging)
  created_at: Date;
}