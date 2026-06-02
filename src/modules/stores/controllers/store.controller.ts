import { Body, Controller, Get, Path, Post, Query, Route, Tags, Response } from "tsoa";
import { storeService, listStoreReviews } from "../services/store.service";
import { CreateStoreRequest } from "../dtos/store.dto";
import { Middlewares, Request } from "tsoa";
import { authorizeUser } from "../../../common/middlewares/auth.middleware";
import { Request as ExpressRequest } from "express";

import { ErrorResponse } from "../../../common/dtos/error.dto";

@Route("stores")
@Tags("Stores")
export class StoreController extends Controller {

  /**
   * 가게를 생성합니다.
   */
  @Post("/")
  @Response<ErrorResponse>(500, "서버 오류")
  @Middlewares(authorizeUser())
  public async createStore(
    @Request() req: ExpressRequest,
    @Body() body: CreateStoreRequest
  ): Promise<any> {
    return await storeService.createStore(body);
  }

  /**
   * 특정 가게의 리뷰 목록을 커서 기반 페이지네이션으로 조회합니다.
   */
  @Get("{storeId}/reviews")
  @Response<ErrorResponse>(500, "서버 오류")
  public async listStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<any> {
    return await listStoreReviews(storeId, cursor ?? 0);
  }
}

