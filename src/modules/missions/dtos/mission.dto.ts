// 클라이언트가 보내는 데이터
export interface CreateMissionRequest {
  store_id: number;    // 어떤 가게의 미션인지
  title: string;       // 미션 제목
  reward: number;      // 포인트 보상
  deadline: string;    // 마감일 (ex "2025-12-31")
}

// 서버가 돌려주는 데이터
export interface CreateMissionResponse {
  id: number;
  store_id: number;
  title: string;
  reward: number;
  deadline: string;
}