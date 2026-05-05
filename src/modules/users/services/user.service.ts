import bcrypt from "bcrypt";
import { UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  // 1. 비밀번호 해싱 처리
  // saltRounds는 보통 10을 사용합니다. 숫자가 높을수록 보안이 강화되지만 연산 속도가 느려집니다.
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    password: hashedPassword,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
