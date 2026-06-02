/**
 * 가게 생성 요청
 */
export interface CreateStoreRequest {
  /** 가게 이름 */
  name: string;

  /** 가게 주소 */
  address: string;
}

/**
 * 미션 생성 요청
 */
export interface CreateMissionRequest {
  /** 미션 제목 */
  title: string;

  /** 미션 보상 포인트 */
  reward: number;

  /** 미션 마감일 */
  deadline: string;
}

/**
 * 리뷰 생성 요청
 */
export interface CreateReviewRequest {
  /** 평점, 1부터 5까지 */
  rating: number;

  /** 리뷰 내용 */
  content: string;
}

/**
 * 회원가입 요청
 */
export interface SignUpRequest {
  /** 회원 이메일 */
  email: string;

  /** 회원 비밀번호 */
  password: string;

  /** 회원 이름 */
  name: string;

  /** 회원 전화번호 */
  phone?: string;

  /** 회원 생일 */
  birthday?: string;
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  /** 회원 이메일 */
  email: string;

  /** 회원 비밀번호 */
  password: string;
}

/**
 * 내 정보 수정 요청
 */
export interface UpdateMyInfoRequest {
  /** 회원 이름 */
  name?: string;

  /** 회원 전화번호 */
  phone?: string;

  /** 회원 생일 */
  birthday?: string;
}
