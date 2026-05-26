/**
 * 가게 정보
 */
export interface StoreResponse {
  /** 가게 ID */
  id: number;

  /** 가게 소속 지역 ID */
  regionId: number;

  /** 가게 이름 */
  name: string;

  /** 가게 주소 */
  address: string;
}

/**
 * 미션 정보
 */
export interface MissionResponse {
  /** 미션 ID */
  id: number;

  /** 미션 등록 가게 ID */
  storeId: number;

  /** 미션 제목 */
  title: string;

  /** 미션 보상 포인트 */
  reward: number;

  /** 미션 마감일 */
  deadline: string;

  /** 미션 생성 시각 */
  createdAt: string;
}

/**
 * 리뷰 정보
 */
export interface ReviewResponse {
  /** 리뷰 ID */
  id: number;

  /** 리뷰 등록 가게 ID */
  storeId: number;

  /** 리뷰 작성 회원 ID */
  memberId: number;

  /** 평점 */
  rating: number;

  /** 리뷰 내용 */
  content: string;

  /** 리뷰 생성 시각 */
  createdAt: string;
}

/**
 * 가게 정보를 포함한 리뷰 정보
 */
export interface ReviewWithStoreResponse extends ReviewResponse {
  /** 리뷰 등록 가게 정보 */
  store: StoreResponse;
}

/**
 * 회원 미션 도전 정보
 */
export interface MemberMissionResponse {
  /** 회원 미션 ID */
  id: number;

  /** 회원 ID */
  memberId: number;

  /** 미션 ID */
  missionId: number;

  /** 미션 진행 상태 */
  status: string;

  /** 미션 도전 시각 */
  challengedAt: string;
}

/**
 * 가게 정보를 포함한 미션 정보
 */
export interface MissionWithStoreResponse extends MissionResponse {
  /** 미션 등록 가게 정보 */
  store: StoreResponse;
}

/**
 * 미션 상세 정보를 포함한 회원 미션 도전 정보
 */
export interface MemberMissionWithMissionResponse extends MemberMissionResponse {
  /** 도전 중인 미션 상세 정보 */
  mission: MissionWithStoreResponse;
}
