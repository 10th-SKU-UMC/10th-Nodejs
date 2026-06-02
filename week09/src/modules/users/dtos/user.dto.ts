// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  /** 유저 이메일 (로그인 시 사용) */
  email: string;
  /** 유저 이름 */
  name: string;
  gender: string;
  birth: Date;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  detailAddress?: string;
  phoneNumber: string;
  /** 선호 카테고리 ID 배열 (예: [1, 2]) */
  preferences: number[];
}

export interface UserSignUpResponse{
    id: number;
    email: string;
    name: string;
    preferCategory: string[];
}

//회원가입성공
export interface SignUpSuccessResponse{
    resultType: string;
    data:{
        userId: number;
    };
}

//회원가입실패
export interface ErrorResponse{
    errorCode: string;
    reason: string;
}

//유저정보수정
export interface UpdateProfileRequest{
    phoneNum?: string;
    birth?: string;
    address? : string;
    detailAddress?: string;
}
export interface UpdateProfileResponse {
    resultType: string;
    data: { message: string };
}