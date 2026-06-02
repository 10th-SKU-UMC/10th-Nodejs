import bcrypt from "bcrypt";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto"; //인터페이스 가져오기 
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../../../common/errors/errors";
import { UpdateUserBody } from "../dtos/user.dto";
import { updateUser } from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);  

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address ?? "",
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const userId = user!.id;
  const preferences = (await getUserPreferencesByUserId(joinUserId)).map(
    (obj) => obj.foodCategory.name,
  );

  return <UserSignUpResponse>{
    userId,
    preferences,
  };
};

export const updateMe = async (userId: number, data: UpdateUserBody) => {
  return await updateUser(userId, data);
};