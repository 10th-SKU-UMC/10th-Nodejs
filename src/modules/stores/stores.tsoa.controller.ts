import { Body, Controller, Get, Path, Post, Query, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { ApiFailResponse, ApiSuccessResponse } from '../../common/swagger/api-response.dto';
import { MissionResponse, ReviewResponse } from '../../common/swagger/domain.dto';
import { CreateMissionRequest, CreateReviewRequest } from '../../common/swagger/request.dto';

@Route('stores')
@Tags('Stores')
export class StoresTsoaController extends Controller {
  /**
   * 특정 가게 미션 등록
   */
  @Post('{storeId}/missions')
  @SuccessResponse('201', 'Created')
  @Response<ApiFailResponse>('400', 'storeId, title, reward, deadline이 유효하지 않은 경우')
  @Response<ApiFailResponse>('404', '존재하지 않는 가게인 경우')
  public async createMission(
    /** 가게 ID */
    @Path() storeId: number,

    /** 미션 생성 요청 body */
    @Body() requestBody: CreateMissionRequest,
  ): Promise<ApiSuccessResponse<MissionResponse>> {
    this.setStatus(201);
    return {} as ApiSuccessResponse<MissionResponse>;
  }

  /**
   * 특정 가게 등록 미션 목록 조회
   */
  @Get('{storeId}/missions')
  @SuccessResponse('200', 'OK')
  @Response<ApiFailResponse>('400', 'storeId, limit, cursor가 유효하지 않은 경우')
  @Response<ApiFailResponse>('404', '존재하지 않는 가게인 경우')
  public async getMissions(
    /** 가게 ID */
    @Path() storeId: number,

    /** 한 번에 조회할 개수, 기본값 10, 최대 50 */
    @Query() limit?: number,

    /** 이전 페이지 마지막 미션 ID */
    @Query() cursor?: number,
  ): Promise<ApiSuccessResponse<MissionResponse[]>> {
    return {} as ApiSuccessResponse<MissionResponse[]>;
  }

  /**
   * 특정 가게 리뷰 작성
   */
  @Post('{storeId}/reviews')
  @SuccessResponse('201', 'Created')
  @Response<ApiFailResponse>('400', 'storeId, rating, content가 유효하지 않은 경우')
  @Response<ApiFailResponse>('404', '존재하지 않는 가게인 경우')
  public async createReview(
    /** 가게 ID */
    @Path() storeId: number,

    /** 리뷰 생성 요청 body */
    @Body() requestBody: CreateReviewRequest,
  ): Promise<ApiSuccessResponse<ReviewResponse>> {
    this.setStatus(201);
    return {} as ApiSuccessResponse<ReviewResponse>;
  }
}
