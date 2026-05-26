import { Body, Controller, Get, Patch, Path, Post, Route, Tags, Response } from "tsoa";
import { userMissionService } from "../services/user_mission.service";
import { CreateUserMissionRequest } from "../dtos/user_mission.dto";

import { ErrorResponse } from "../../../common/dtos/error.dto";

@Route("user-missions")
@Tags("UserMissions")
export class UserMissionController extends Controller {

  /**
   * 미션에 도전합니다.
   */
  @Post("/")
  @Response<ErrorResponse>(400, "잘못된 요청 (존재하지 않는 미션 / 이미 도전 중)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async createUserMission(
    @Body() body: CreateUserMissionRequest
  ): Promise<any> {
    return await userMissionService.createUserMission(body);
  }

  /**
   * 도전 중인 미션 목록을 조회합니다.
   */
  @Get("user/{userId}")
  @Response<ErrorResponse>(500, "서버 오류")
  public async getChallengingMissions(
    @Path() userId: number
  ): Promise<any> {
    return await userMissionService.getChallengingMissions(userId);
  }

  /**
   * 미션을 완료 처리합니다.
   */
  @Patch("{userMissionId}/complete")
  @Response<ErrorResponse>(400, "잘못된 요청 (존재하지 않는 미션 / 이미 완료)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async completeMission(
    @Path() userMissionId: number
  ): Promise<any> {
    return await userMissionService.completeMission(userMissionId);
  }
}