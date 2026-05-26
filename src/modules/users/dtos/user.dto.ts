import { setPreference } from "../repositories/user.repository";

// 요청 DTO
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: Date;        // string → Date로 변경
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  password: string;
  preferences: number[];
}

// 응답 DTO
export interface UserSignUpResponse {
  userId: number;     // id → userId로 변경
  preferences: string[];  // perferCategory → preferences로 변경
}