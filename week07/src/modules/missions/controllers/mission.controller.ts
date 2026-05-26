import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import { addMissionService, handleListStoreMissionsService } from "../services/mission.service";

@Route("missions")
@Tags("미션")
export class MissionController extends Controller {

    // 가게 미션 추가
    @Post("stores/{storeId}")
    public async addMission(
        @Path() storeId: number,
        @Body() missionData: any
    ): Promise<any> {
        console.log("==가게 미션 추가 요청==");
        console.log("요청 내용:", missionData);

        const newMissionId = await addMissionService(storeId, missionData);

        return {
            isSuccess: true,
            message: `생성완료`,
            data: missionData
        };
    }

    // 특정 가게 미션 목록
    @Get("stores/{storeId}")
    public async handleListStoreMissions(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<any> {
        console.log("===특정 가게 미션 조회 요청===");
        console.log("요청 가게 번호 :", storeId);
        
        const missions = await handleListStoreMissionsService(storeId, cursor);
        
        return {
            isSuccess: true,
            message: `조회완료`,
            data: missions
        };
    }
}