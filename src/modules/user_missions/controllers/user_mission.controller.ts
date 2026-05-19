import {
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Response,
  Route,
  Tags,
} from "tsoa";
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
  @Response<ApiResponse<UserMissionCreateResponse>>(201, "미션 참여 성공")
  @Response<ApiResponse<null>>(409, "중복 참여 에러")
  public async handleCreateUserMission(
    @Path() userId: number,
    @Path() missionId: number,
  ): Promise<ApiResponse<UserMissionCreateResponse>> {
    const userMission = await createUserMission(userId, missionId);

    this.setStatus(201);
    return success(userMission);
  }

  @Get("in-progress")
  @Response<ApiResponse<InProgressUserMissionListResponse>>(200, "참여중인 미션목록 반환")
  @Response<ApiResponse<null>>(500, "진행 중인 미션 목록 조회 실패")
  public async handleListInProgressUserMissions(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<InProgressUserMissionListResponse>> {
    const userMissions = await listInProgressUserMissions(userId, cursor);

    return success(userMissions);
  }

  @Patch("{missionId}/complete")
  @Response<ApiResponse<CompletedUserMissionResponse>>(200, "미션 완료 처리 성공")
  @Response<ApiResponse<null>>(404, "진행중인 미션 없음")
  public async handleCompleteUserMission(
    @Path() userId: number,
    @Path() missionId: number,
  ): Promise<ApiResponse<CompletedUserMissionResponse>> {
    const userMission = await completeInProgressUserMission(userId, missionId);

    return success(userMission);
  }
}
