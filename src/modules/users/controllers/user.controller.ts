import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser, UserSignUpRequest } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("회원가입을 요청했습니다!");

    // DTO 인터페이스를 활용한 데이터 정제
    const result = await userSignUp(bodyToUser(req.body as UserSignUpRequest));

    res.status(StatusCodes.OK).json({
      isSuccess: true,
      message: "회원가입이 완료되었습니다.",
      result,
    });
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
