import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  CreateStoreRequest,
  StoreCreateResponse,
} from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

@Route("regions/{regionId}/stores")
@Tags("Stores")
export class StoreController extends Controller {
  @Post()
  public async handleCreateStore(
    @Path() regionId: number,
    @Body() body: CreateStoreRequest,
  ): Promise<ApiResponse<StoreCreateResponse>> {
    const store = await createStore(regionId,body);

    return success(store);
  }
}
