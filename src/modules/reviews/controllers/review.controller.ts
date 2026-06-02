import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Query,
  Request,
  Response,
  Route,
  Tags,
} from "tsoa";
import { Request as ExpressRequest } from "express";
import { ApiResponse, success } from "../../../common/responses/response.js";
import {
  authenticateJwt,
  getAuthenticatedUserId,
} from "../../../common/middlewares/auth.middleware.js";
import {
  CreateReviewRequest,
  MyReviewListResponse,
  ReviewCreateResponse,
  ReviewListResponse,
} from "../dtos/review.dto.js";
import {
  createReview,
  listMyReviews,
  listStoreReviews,
} from "../services/review.service.js";

@Route("stores/{storeId}/reviews")
@Tags("Reviews")
export class StoreReviewController extends Controller {

  @Post()
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<ReviewCreateResponse>>(200, "리뷰 생성 성공")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  @Response<ApiResponse<null>>(404, "가게 없음")
  public async handleCreateReview(
    @Path() storeId: number,
    @Request() req: ExpressRequest,
    @Body() body: CreateReviewRequest,
  ): Promise<ApiResponse<ReviewCreateResponse>> {
    const review = await createReview(storeId, getAuthenticatedUserId(req), body);
    
    return success(review);
  }

  @Get()
  @Response<ApiResponse<ReviewListResponse>>(200, "가게 리뷰 목록 반환")
  @Response<ApiResponse<null>>(500, "가게 리뷰 목록 조회 실패")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<ReviewListResponse>> {
    const reviews = await listStoreReviews(storeId, cursor);

    return success(reviews);
  }
}

@Route("users/me/reviews")
@Tags("Reviews")
export class MyReviewController extends Controller {

  @Get()
  @Middlewares(authenticateJwt())
  @Response<ApiResponse<MyReviewListResponse>>(200, "내 리뷰 목록 반환")
  @Response<ApiResponse<null>>(401, "로그인 필요")
  @Response<ApiResponse<null>>(500, "내 리뷰 목록 조회 실패")
  public async handleListMyReviews(
    @Request() req: ExpressRequest,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<MyReviewListResponse>> {
    const reviews = await listMyReviews(getAuthenticatedUserId(req), cursor);

    return success(reviews);
  }
}
