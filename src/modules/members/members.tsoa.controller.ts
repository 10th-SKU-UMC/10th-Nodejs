import { Controller, Get, Query, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { ApiFailResponse, ApiSuccessResponse } from '../../common/swagger/api-response.dto';
import { MemberMissionWithMissionResponse, ReviewWithStoreResponse } from '../../common/swagger/domain.dto';

@Route('members/me')
@Tags('Members')
export class MembersTsoaController extends Controller {
  /**
   * 현재 로그인한 회원 리뷰 목록 조회
   */
  @Get('reviews')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', 'limit, cursor가 유효하지 않은 경우')
  public async getMyReviews(
    /** 한 번에 조회할 개수, 기본값 10, 최대 50 */
    @Query() limit?: number,

    /** 이전 페이지 마지막 리뷰 ID */
    @Query() cursor?: number,
  ): Promise<ApiSuccessResponse<ReviewWithStoreResponse[]>> {
    return {} as ApiSuccessResponse<ReviewWithStoreResponse[]>;
  }

  /**
   * 현재 로그인한 회원 진행 중 미션 목록 조회
   */
  @Get('missions')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', 'limit, cursor가 유효하지 않은 경우')
  public async getMyInProgressMissions(
    /** 한 번에 조회할 개수, 기본값 10, 최대 50 */
    @Query() limit?: number,

    /** 이전 페이지 마지막 회원 미션 ID */
    @Query() cursor?: number,
  ): Promise<ApiSuccessResponse<MemberMissionWithMissionResponse[]>> {
    return {} as ApiSuccessResponse<MemberMissionWithMissionResponse[]>;
  }
}
