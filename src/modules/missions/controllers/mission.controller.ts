import { Body, Controller, Get, Path, Post, Route, Tags, Response } from "tsoa";
import { missionService } from "../services/mission.service";
import { CreateMissionRequest } from "../dtos/mission.dto";

import { ErrorResponse } from "../../../common/dtos/error.dto";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {

  /**
   * 미션을 생성합니다.
   */
  @Post("/")
  @Response<ErrorResponse>(400, "잘못된 요청 (존재하지 않는 가게 / 입력값 오류)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async createMission(
    @Body() body: CreateMissionRequest
  ): Promise<any> {
    return await missionService.createMission(body);
  }

  /**
   * 특정 가게의 미션 목록을 조회합니다.
   */
  @Get("store/{storeId}")
  @Response<ErrorResponse>(400, "존재하지 않는 가게")
  @Response<ErrorResponse>(500, "서버 오류")
  public async getStoreMissions(
    @Path() storeId: number
  ): Promise<any> {
    return await missionService.getStoreMissions(storeId);
  }
}