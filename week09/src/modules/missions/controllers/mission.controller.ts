import { Body, Controller, Get, Path, Post, Query, Route, Tags, Response, SuccessResponse, Request, Security } from "tsoa";
import { addMissionService, handleListStoreMissionsService } from "../services/mission.service";
import { MissionResponse, addMissionReqeust } from "../dtos/mission.dto";
import { ApiSuccessResponse, ApiErrorResponse } from "../../stores/dtos/store.dto";
import { ApiResponse } from "../../../common/response/response";

@Route("missions")
@Tags("미션")
export class MissionController extends Controller {

    // 가게 미션 추가
    @Security("jwt")
    @Post("stores/{storeId}")
    @SuccessResponse("200", "미션 추가 완료")
    @Response<ApiErrorResponse>("400", "미션추가실패: 필수값누락")
    @Response<ApiErrorResponse>("404", "미션추가실패: 존재하지않는가게")
    public async addMission(
        @Path() storeId: number,
        @Request() req: any,
        @Body() missionData: addMissionReqeust
    ): Promise<ApiResponse<any>> {
        console.log("==가게 미션 추가 요청==");
        console.log("요청 내용:", missionData);
        const userId = req.user.id;
        const newMissionId = await addMissionService(userId, storeId, missionData);

        return {
            resultType: "SUCCESS",
            data: missionData,
            error: null
        };
    }

    // 특정 가게 미션 목록
    @Get("stores/{storeId}")
    @SuccessResponse("200", "미션 조회 완료")
    @Response<ApiErrorResponse>("404", "미션조회실패: 존재하지않는가게")
    public async handleListStoreMissions(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<ApiResponse<any>> {
        console.log("===특정 가게 미션 조회 요청===");
        console.log("요청 가게 번호 :", storeId);
        
        const missions = await handleListStoreMissionsService(storeId, cursor);
        
        return {
            resultType: "SUCCESS",
            data: missions,
            error: null
        };
    }
}