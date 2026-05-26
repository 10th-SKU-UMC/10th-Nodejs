export interface CreateMissionRequest {
  /** 미션 제목 */
  title: string;
  /** 미션 내용 */
  content: string;
  /** 미션 성공 시 지급 포인트 */
  point: number;
  /** 미션 마감일 (예: 2026-05-19) */
  deadline: string;
}

export interface MissionCreateResponse {
  /** 미션 ID */
  mission_id: number;
  /** 미션 제목 */
  title: string;
  /** 미션 내용 */
  content: string;
  /** 미션 성공 시 지급 포인트 */
  point: number;
  /** 미션 마감일 */
  deadline: Date;
  /** 미션 생성일 */
  createdAt: Date;
}

export interface MissionListResponse {
  /** 미션 목록 */
  data: {
    /** 미션 ID */
    missionId: number;
    /** 미션 제목 */
    title: string;
    /** 미션 내용 */
    content: string;
    /** 미션 성공 시 지급 포인트 */
    point: number;
    /** 미션 마감일 */
    deadline: Date;
    /** 미션 생성일 */
    createdAt: Date | null;
  }[];
  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 페이지 조회에 사용할 커서 */
    cursor: number | null;
  };
}
