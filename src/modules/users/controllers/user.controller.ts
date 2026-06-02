import { Body, Controller, Get, Middlewares, Patch, Post, Request, Route, Tags } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse, UpdateUserBody } from "../dtos/user.dto";
import { userSignUp, updateMe } from "../services/user.service";
import { ApiResponse, success } from "../../../common/responses/response";
import { authorizeUser } from "../../../common/middlewares/auth.middleware";
import { Request as ExpressRequest } from "express";

@Route("users")
@Tags("Users")
export class UserController extends Controller {

  /**
   * 회원가입
   */
  @Post("signup")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body);
    return success(user);
  }

  /**
   * 마이페이지 - 로그인한 사용자 정보를 반환합니다. (JWT 인증 필요)
   * Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
   */
  @Get("mypage")
  @Middlewares(authorizeUser())
  public async handleMypage(@Request() req: ExpressRequest): Promise<any> {
    const user = req.user as { id: number; name: string; email: string };
    return {
      resultType: "SUCCESS",
      error: null,
      success: {
        message: `환영합니다, ${user.name}님!`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    };
  }
/**
   * 내 정보 수정 (JWT 인증 필요)
   */
  @Patch("me")
  @Middlewares(authorizeUser())
  public async handleUpdateMe(
    @Request() req: ExpressRequest,
    @Body() body: UpdateUserBody,
  ): Promise<ApiResponse<any>> {
    const user = req.user as { id: number };
    const result = await updateMe(user.id, body);
    return success(result);
  }
}

