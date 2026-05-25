/**
 * API 성공 응답 공통 포맷
 */
export interface ApiSuccessResponse<T> {
  /** 요청 처리 결과 */
  resultType: 'SUCCESS';

  /** 성공 응답 null 값 */
  error: null;

  /** API별 성공 응답 데이터 */
  data: T;
}

/**
 * 에러 응답 추가 데이터
 */
export interface ApiErrorData {
  /** 추가 에러 데이터 필드 */
  [key: string]: string | number | boolean | null;
}

/**
 * API 실패 응답 에러 상세 정보
 */
export interface ApiErrorResponseBody {
  /** 에러 코드 */
  errorCode: string;

  /** 클라이언트 전달 에러 메시지 */
  message: string;

  /** 에러 관련 추가 데이터 */
  data: ApiErrorData | null;
}

/**
 * API 실패 응답 공통 포맷
 */
export interface ApiFailResponse {
  /** 요청 처리 결과 */
  resultType: 'FAIL';

  /** 실패 원인 상세 정보 */
  error: ApiErrorResponseBody;

  /** 실패 응답 null 값 */
  data: null;
}
