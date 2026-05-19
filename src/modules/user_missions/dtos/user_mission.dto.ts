export interface UserMissionCreateResponse {
  /** 유저 미션 ID */
  user_mission_id: number;
  /** 유저 미션 진행 상태 */
  status: string;
  /** 유저 미션 생성일 */
  created_at: Date;
}

export interface InProgressUserMissionListResponse {
  /** 진행 중인 유저 미션 목록 */
  data: {
    /** 유저 미션 ID */
    userMissionId: number;
    /** 유저 미션 진행 상태 */
    status: string | null;
    /** 유저 미션 생성일 */
    createdAt: Date | null;
    /** 미션 정보 */
    mission: {
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
      /** 미션이 속한 가게 정보 */
      store: {
        /** 가게 ID */
        storeId: number;
        /** 가게 이름 */
        name: string;
      };
    };
  }[];
  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 페이지 조회에 사용할 커서 */
    cursor: number | null;
  };
}

export interface CompletedUserMissionResponse {
  /** 유저 미션 ID */
  user_mission_id: number;
  /** 유저 미션 진행 상태 */
  status: string | null;
  /** 유저 미션 생성일 */
  created_at: Date | null;
}
