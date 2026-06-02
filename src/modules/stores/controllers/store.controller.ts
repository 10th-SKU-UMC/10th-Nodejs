import {
  Body,
  Controller,
  Middlewares,
  Path,
  Post,
  Response,
  Route,
  Tags,
} from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  CreateStoreRequest,
  StoreCreateResponse,
} from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";
import { authenticateJwt } from "../../../common/middlewares/auth.middleware.js";

@Route("regions/{regionId}/stores")
@Tags("Stores")
export class StoreController extends Controller {

  @Post()
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<StoreCreateResponse>>(200, "가게 생성 성공")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  @Response<ApiResponse<null>>(500, "가게 생성 실패")
  public async handleCreateStore(
    @Path() regionId: number,
    @Body() body: CreateStoreRequest,
  ): Promise<ApiResponse<StoreCreateResponse>> {
    const store = await createStore(regionId, body);

    return success(store);
  }
}
