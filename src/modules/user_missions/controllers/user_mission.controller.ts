import {
  Controller,
  Get,
  Middlewares,
  Patch,
  Path,
  Post,
  Query,
  Request,
  Response,
  Route,
  Tags,
} from "tsoa";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  authenticateJwt,
  getAuthenticatedUserId,
} from "../../../common/middlewares/auth.middleware.js";
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

@Route("users/me/missions")
@Tags("UserMissions")
export class UserMissionController extends Controller {

  @Post("{missionId}")
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<UserMissionCreateResponse>>(201, "미션 참여 성공")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  @Response<ApiResponse<null>>(409, "중복 참여 에러")
  public async handleCreateUserMission(
    @Path() missionId: number,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<UserMissionCreateResponse>> {
    const userMission = await createUserMission(getAuthenticatedUserId(req), missionId);

    this.setStatus(201);
    return success(userMission);
  }

  @Get("in-progress")
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<InProgressUserMissionListResponse>>(200, "참여중인 미션목록 반환")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  @Response<ApiResponse<null>>(500, "진행 중인 미션 목록 조회 실패")
  public async handleListInProgressUserMissions(
    @Request() req: ExpressRequest,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<InProgressUserMissionListResponse>> {
    const userMissions = await listInProgressUserMissions(getAuthenticatedUserId(req), cursor);

    return success(userMissions);
  }

  @Patch("{missionId}/complete")
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<CompletedUserMissionResponse>>(200, "미션 완료 처리 성공")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  @Response<ApiResponse<null>>(404, "진행중인 미션 없음")
  public async handleCompleteUserMission(
    @Path() missionId: number,
    @Request() req: ExpressRequest,
  ): Promise<ApiResponse<CompletedUserMissionResponse>> {
    const userMission = await completeInProgressUserMission(getAuthenticatedUserId(req), missionId);

    return success(userMission);
  }
}
