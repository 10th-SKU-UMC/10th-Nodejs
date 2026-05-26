import { Body, Controller, Get, Path, Post, Route, Tags, Response } from "tsoa";
import { reviewService } from "../services/review.service";
import { CreateReviewRequest } from "../dtos/review.dto";

import { ErrorResponse } from "../../../common/dtos/error.dto";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

  /**
   * 리뷰를 생성합니다.
   */
  @Post("/")
  @Response<ErrorResponse>(400, "잘못된 요청 (존재하지 않는 가게 / 입력값 오류)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async createReview(
    @Body() body: CreateReviewRequest
  ): Promise<any> {
    return await reviewService.createReview(body);
  }

  /**
   * 내 리뷰 목록을 조회합니다.
   */
  @Get("user/{userId}")
  @Response<ErrorResponse>(500, "서버 오류")
  public async getMyReviews(
    @Path() userId: number
  ): Promise<any> {
    return await reviewService.getMyReviews(userId);
  }
}