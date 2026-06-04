import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Query,
  Response,
  Route,
  Tags,
} from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  CreateMissionRequest,
  MissionCreateResponse,
  MissionListResponse,
} from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";
import { authenticateJwt } from "../../../common/middlewares/auth.middleware.js";

@Route("stores/{storeId}/missions")
@Tags("Missions")
export class MissionController extends Controller {
  
  @Post()
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<MissionCreateResponse>>(200, "미션 생성 성공")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  @Response<ApiResponse<null>>(500, "미션 생성 실패")
  public async handleCreateMission(
    @Path() storeId: number,
    @Body() body: CreateMissionRequest,
  ): Promise<ApiResponse<MissionCreateResponse>> {
    const mission = await createMission(storeId, body);

    return success(mission);
  }

  @Get()
  @Response<ApiResponse<MissionListResponse>>(200, "가게 미션 목록 반환")
  @Response<ApiResponse<null>>(500, "가게 미션 목록 조회 실패")
  public async handleListStoreMissions(
    @Path() storeId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<MissionListResponse>> {
    const missions = await listStoreMissions(storeId, cursor);
    return success(missions);
  }
}
