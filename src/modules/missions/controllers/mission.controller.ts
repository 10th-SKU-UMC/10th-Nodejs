import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  CreateMissionRequest,
  MissionCreateResponse,
  MissionListResponse,
} from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";

@Route("stores/{storeId}/missions")
@Tags("Missions")
export class MissionController extends Controller {
  @Post()
  public async handleCreateMission(
    @Path() storeId: number,
    @Body() body: CreateMissionRequest,
  ): Promise<ApiResponse<MissionCreateResponse>> {
    const mission = await createMission(storeId, body);

    return success(mission);
  }

  @Get()
  public async handleListStoreMissions(
    @Path() storeId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<MissionListResponse>> {
    const missions = await listStoreMissions(storeId, cursor);
    return success(missions);
  }
}
