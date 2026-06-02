import { Body, Controller, Get, Patch, Post, Query, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { ApiFailResponse, ApiSuccessResponse } from '../../common/swagger/api-response.dto';
import { AuthTokenResponse, GoogleLoginStartResponse, MemberMissionWithMissionResponse, MemberResponse, ReviewWithStoreResponse } from '../../common/swagger/domain.dto';
import { LoginRequest, SignUpRequest, UpdateMyInfoRequest } from '../../common/swagger/request.dto';

@Route('auth')
@Tags('Auth')
export class AuthTsoaController extends Controller {
  /**
   * 이메일 회원가입
   */
  @Post('signup')
  @SuccessResponse('201', 'Created')
  @Response<ApiFailResponse>('400', 'email, password, name이 유효하지 않은 경우')
  @Response<ApiFailResponse>('409', '다른 로그인 방식으로 가입된 이메일인 경우')
  public async signUp(
    /** 회원가입 요청 body */
    @Body() requestBody: SignUpRequest,
  ): Promise<ApiSuccessResponse<AuthTokenResponse>> {
    this.setStatus(201);
    return {} as ApiSuccessResponse<AuthTokenResponse>;
  }

  /**
   * Google 로그인 시작
   */
  @Get('google')
  @SuccessResponse('302', 'Redirect')
  public async startGoogleLogin(): Promise<GoogleLoginStartResponse> {
    return {} as GoogleLoginStartResponse;
  }

  /**
   * Google 로그인 콜백
   */
  @Get('google/callback')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('401', 'Google 로그인이 실패한 경우')
  @Response<ApiFailResponse>('409', '다른 로그인 방식으로 가입된 이메일인 경우')
  public async googleCallback(): Promise<ApiSuccessResponse<AuthTokenResponse>> {
    return {} as ApiSuccessResponse<AuthTokenResponse>;
  }

  /**
   * 이메일 로그인
   */
  @Post('login')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', 'email, password가 유효하지 않은 경우')
  @Response<ApiFailResponse>('404', '이메일 또는 비밀번호가 올바르지 않은 경우')
  public async login(
    /** 로그인 요청 body */
    @Body() requestBody: LoginRequest,
  ): Promise<ApiSuccessResponse<AuthTokenResponse>> {
    return {} as ApiSuccessResponse<AuthTokenResponse>;
  }
}

@Route('members/me')
@Tags('Members')
export class MembersTsoaController extends Controller {
  /**
   * 현재 로그인한 회원 정보 조회
   */
  @Get()
  @Security('bearerAuth')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('401', '로그인이 필요하거나 토큰이 유효하지 않은 경우')
  public async getMyInfo(): Promise<ApiSuccessResponse<MemberResponse>> {
    return {} as ApiSuccessResponse<MemberResponse>;
  }

  /**
   * 현재 로그인한 회원 정보 수정
   */
  @Patch()
  @Security('bearerAuth')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', '수정할 회원 정보가 없는 경우')
  @Response<ApiFailResponse>('401', '로그인이 필요하거나 토큰이 유효하지 않은 경우')
  public async updateMyInfo(
    /** 내 정보 수정 요청 body */
    @Body() requestBody: UpdateMyInfoRequest,
  ): Promise<ApiSuccessResponse<MemberResponse>> {
    return {} as ApiSuccessResponse<MemberResponse>;
  }

  /**
   * 현재 로그인한 회원 리뷰 목록 조회
   */
  @Get('reviews')
  @Security('bearerAuth')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', 'limit, cursor가 유효하지 않은 경우')
  @Response<ApiFailResponse>('401', '로그인이 필요하거나 토큰이 유효하지 않은 경우')
  public async getMyReviews(
    /** 한 번에 조회할 개수, 기본값 10, 최대 50 */
    @Query() limit?: number,

    /** 이전 페이지 마지막 리뷰 ID */
    @Query() cursor?: number,
  ): Promise<ApiSuccessResponse<ReviewWithStoreResponse[]>> {
    return {} as ApiSuccessResponse<ReviewWithStoreResponse[]>;
  }

  /**
   * 현재 로그인한 회원 진행 중 미션 목록 조회
   */
  @Get('missions')
  @Security('bearerAuth')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', 'limit, cursor가 유효하지 않은 경우')
  @Response<ApiFailResponse>('401', '로그인이 필요하거나 토큰이 유효하지 않은 경우')
  public async getMyInProgressMissions(
    /** 한 번에 조회할 개수, 기본값 10, 최대 50 */
    @Query() limit?: number,

    /** 이전 페이지 마지막 회원 미션 ID */
    @Query() cursor?: number,
  ): Promise<ApiSuccessResponse<MemberMissionWithMissionResponse[]>> {
    return {} as ApiSuccessResponse<MemberMissionWithMissionResponse[]>;
  }
}
