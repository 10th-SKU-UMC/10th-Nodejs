import { Body, Controller, Path, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { ApiFailResponse, ApiSuccessResponse } from '../../common/swagger/api-response.dto';
import { StoreResponse } from '../../common/swagger/domain.dto';
import { CreateStoreRequest } from '../../common/swagger/request.dto';

@Route('regions')
@Tags('Stores')
export class RegionsTsoaController extends Controller {
  /**
   * 특정 지역 가게 등록
   */
  @Post('{regionId}/stores')
  @SuccessResponse('201', 'Created')
  @Response<ApiFailResponse>('400', 'regionId, name, address가 유효하지 않은 경우')
  @Response<ApiFailResponse>('404', '존재하지 않는 지역인 경우')
  public async createStore(
    /** 지역 ID */
    @Path() regionId: number,

    /** 가게 생성 요청 body */
    @Body() requestBody: CreateStoreRequest,
  ): Promise<ApiSuccessResponse<StoreResponse>> {
    this.setStatus(201);
    return {} as ApiSuccessResponse<StoreResponse>;
  }
}
