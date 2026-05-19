import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../../../common/responses/response.js";
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
  public async handleCreateReview(
    @Path() storeId: number,
    @Body() body: CreateReviewRequest,
  ): Promise<ApiResponse<ReviewCreateResponse>> {
    const review = await createReview(storeId, body);
    
    return success(review);
  }

  @Get()
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<ReviewListResponse>> {
    const reviews = await listStoreReviews(storeId, cursor);

    return success(reviews);
  }
}

@Route("users/{userId}/reviews")
@Tags("Reviews")
export class MyReviewController extends Controller {
  @Get()
  public async handleListMyReviews(
    @Path() userId: number,
    @Query() cursor: number = 0,
  ): Promise<ApiResponse<MyReviewListResponse>> {
    const reviews = await listMyReviews(userId, cursor);

    return success(reviews);
  }
}
