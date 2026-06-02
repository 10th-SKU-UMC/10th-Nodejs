import { Body, Controller, Get, Middlewares, Patch, Path, Post, Request, Route, Tags, Response } from "tsoa";
import { userMissionService } from "../services/user_mission.service";
import { CreateUserMissionBody } from "../dtos/user_mission.dto";
import { ErrorResponse } from "../../../common/dtos/error.dto";
import { authorizeUser } from "../../../common/middlewares/auth.middleware";
import { Request as ExpressRequest } from "express";

@Route("user-missions")
@Tags("UserMissions")
export class UserMissionController extends Controller {

  /**
   * 미션에 도전합니다. (JWT 인증 필요)
   * Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
   */
  @Post("/")
  @Middlewares(authorizeUser())
  @Response<ErrorResponse>(400, "잘못된 요청 (존재하지 않는 미션 / 이미 도전 중)")
  @Response<ErrorResponse>(401, "인증 실패 (로그인 필요)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async createUserMission(
    @Request() req: ExpressRequest,
    @Body() body: CreateUserMissionBody
  ): Promise<any> {
    const user = req.user as { id: number }; // authorizeUser()가 주입한 JWT 유저
    return await userMissionService.createUserMission({ ...body, user_id: user.id });
  }

  /**
   * 내가 도전 중인 미션 목록을 조회합니다. (JWT 인증 필요)
   * Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
   */
  @Get("my")
  @Middlewares(authorizeUser())
  @Response<ErrorResponse>(401, "인증 실패 (로그인 필요)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async getChallengingMissions(
    @Request() req: ExpressRequest
  ): Promise<any> {
    const user = req.user as { id: number }; // authorizeUser()가 주입한 JWT 유저
    return await userMissionService.getChallengingMissions(user.id);
  }

  /**
   * 미션을 완료 처리합니다. (JWT 인증 필요)
   * Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
   */
  @Patch("{userMissionId}/complete")
  @Middlewares(authorizeUser())
  @Response<ErrorResponse>(400, "잘못된 요청 (존재하지 않는 미션 / 이미 완료)")
  @Response<ErrorResponse>(401, "인증 실패 (로그인 필요)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async completeMission(
    @Path() userMissionId: number
  ): Promise<any> {
    return await userMissionService.completeMission(userMissionId);
  }
}
