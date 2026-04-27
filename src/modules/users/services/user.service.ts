import bcrypt from "bcrypt";
import { UserSignUpRequest, responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data: any) => {
  const hn = 10;
  const h_password = await bcrypt.hash(data.password, hn);

  // 1. 유저 정보 저장
  const joinUserId = await addUser({ ...data, password: h_password });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  // 2. 선호 카테고리 매핑 (for...of 사용 권장)
  for (const preferenceId of data.preferences) {
    await setPreference(joinUserId, preferenceId);
  }

  // 3. 응답 데이터 조립
  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
