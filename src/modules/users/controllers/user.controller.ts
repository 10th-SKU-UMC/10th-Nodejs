import {
  Body,
  Controller,
  Get,
  Middlewares,
  Patch,
  Post,
  Query,
  Request,
  Response,
  Route,
  Tags,
} from "tsoa";
import {
  UpdateMyProfileRequest,
  UpdateMyProfileResponse,
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto.js";
import { updateMyProfile, userSignUp } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  authenticateJwt,
  getAuthenticatedUserId,
} from "../../../common/middlewares/auth.middleware.js";
import { Request as ExpressRequest } from "express";

@Route("users") // 라우트 경로
@Tags("Users") // Swagger 태그
export class UserController extends Controller {

  @Post("signup") // 엔드포인드 정의
  @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
  @Response<ApiResponse<null>>(409, "중복된 이메일 에러")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest,
  ): Promise<ApiResponse<UserSignUpResponse>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body); //서비스 로직 호출
    return success(user); //성공 응답 보내기
  }

  @Patch("me")
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<UpdateMyProfileResponse>>(200, "내 정보 수정 성공")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  public async handleUpdateMyProfile(
    @Request() req: ExpressRequest,
    @Body() body: UpdateMyProfileRequest,
  ): Promise<ApiResponse<UpdateMyProfileResponse>> {
    const user = await updateMyProfile(getAuthenticatedUserId(req), body);

    return success(user);
  }

  @Get("guest")
  @Response<ApiResponse<string>>(200, "게스트 페이지 조회 성공")
  public async handleGuestPage(): Promise<ApiResponse<string>> {
    return success(`
            <h1>게스트 페이지</h1>
            <p>이 페이지는 로그인이 필요 없습니다.</p>
            <ul>
                <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
            </ul>
        `);
  }

  @Get("login")
  @Response<ApiResponse<string>>(200, "로그인 페이지 조회 성공")
  public async handleLoginPage(): Promise<ApiResponse<string>> {
    return success(
      "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>",
    );
  }

  @Get("mypage")
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<string>>(200, "마이페이지 조회 성공")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  public async handleMypage(
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<string>> {
    const user = req.user as { name?: string } | undefined;

    return success(`
            <h1>마이페이지</h1>
            <p>환영합니다, ${user?.name ?? "사용자"}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `);
  }

  @Get("set-login")
  @Response<ApiResponse<string>>(200, "로그인 쿠키 생성 성공")
  public async handleSetLogin(
    @Request() req: ExpressRequest,
    @Query() username: string,
  ): Promise<ApiResponse<string>> {
    req.res!.cookie("username", username, { maxAge: 3600000 });
    return success(
      '로그인 쿠키 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>',
    );
  }

  @Get("set-logout")
  @Response<ApiResponse<string>>(200, "로그아웃 성공")
  public async handleSetLogout(
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<string>> {
    req.res!.clearCookie("username");
    return success(
      '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>',
    );
  }
}
