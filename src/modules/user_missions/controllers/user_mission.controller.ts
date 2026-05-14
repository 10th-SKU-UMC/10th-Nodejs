import { Controller, Get, Patch, Path, Post, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  CompletedUserMissionResponse,
  InProgressUserMissionListResponse,
  UserMissionCreateResponse,
} from "../dtos/user_mission.dto.js";
import {
  completeInProgressUserMission,
  createUserMission,
  listInProgressUserMissions,
} from "../services/user_mission.service.js";

@Route("users/{userId}/missions")
@Tags("UserMissions")
export class UserMissionController extends Controller {
  @Post("{missionId}")
  public async handleCreateUserMission(
    @Path() userId: number,
    @Path() missionId: number,
  ): Promise<ApiResponse<UserMissionCreateResponse>> {
    const userMission = await createUserMission(userId, missionId);

    this.setStatus(201);
    return success(userMission);
  }

  @Get("in-progress")
  public async handleListInProgressUserMissions(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<InProgressUserMissionListResponse>> {
    const userMissions = await listInProgressUserMissions(userId, cursor);

    return success(userMissions);
  }

  @Patch("{missionId}/complete")
  public async handleCompleteUserMission(
    @Path() userId: number,
    @Path() missionId: number,
  ): Promise<ApiResponse<CompletedUserMissionResponse>> {
    const userMission = await completeInProgressUserMission(userId, missionId);

    return success(userMission);
  }
}
