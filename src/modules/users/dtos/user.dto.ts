// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  /** 유저 비밀번호 */
  password: string;
  /** 유저 이름 */
  name: string;
  /** 성별 (M or F) */
  gender: string;
  /** 생년월일 (예: 2000-01-01) */
  birth: Date;
  /** 기본 주소 (예: 서울시 성북구 안암로 111) */
  address?: string;
  /** 상세 주소 (예: 101호) */
  detailAddress?: string;
  /** 유저 핸드폰 번호 (예: 010-1234-5678) */
  phoneNumber: string;
  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

//응답 DTO
export interface UserSignUpResponse {
  userId: number;
  preferences: string[];
}