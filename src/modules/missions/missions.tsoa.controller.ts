import { Controller, Patch, Path, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { ApiFailResponse, ApiSuccessResponse } from '../../common/swagger/api-response.dto';
import { MemberMissionResponse } from '../../common/swagger/domain.dto';

@Route('missions')
@Tags('Missions')
export class MissionsTsoaController extends Controller {
  /**
   * 특정 미션 도전
   */
  @Post('{missionId}/challenges')
  @SuccessResponse('201', 'Created')
  @Response<ApiFailResponse>('400', 'missionId가 유효하지 않은 경우')
  @Response<ApiFailResponse>('404', '존재하지 않는 미션인 경우')
  @Response<ApiFailResponse>('409', '이미 도전 중인 미션인 경우')
  public async challengeMission(
    /** 미션 ID */
    @Path() missionId: number,
  ): Promise<ApiSuccessResponse<MemberMissionResponse>> {
    this.setStatus(201);
    return {} as ApiSuccessResponse<MemberMissionResponse>;
  }

  /**
   * 진행 중인 미션 완료 처리
   */
  @Patch('{missionId}/challenges/complete')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', 'missionId가 유효하지 않은 경우')
  @Response<ApiFailResponse>('404', '진행 중인 미션이 아닌 경우')
  public async completeChallenge(
    /** 미션 ID */
    @Path() missionId: number,
  ): Promise<ApiSuccessResponse<MemberMissionResponse>> {
    return {} as ApiSuccessResponse<MemberMissionResponse>;
  }
}
