import { Body, Controller, Get, Middlewares, Post, Request, Route, Tags, Response } from "tsoa";
import { reviewService } from "../services/review.service";
import { CreateReviewBody } from "../dtos/review.dto";
import { ErrorResponse } from "../../../common/dtos/error.dto";
import { authorizeUser } from "../../../common/middlewares/auth.middleware";
import { Request as ExpressRequest } from "express";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

  /**
   * 리뷰를 생성합니다. (JWT 인증 필요)
   * Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
   */
  @Post("/")
  @Middlewares(authorizeUser())
  @Response<ErrorResponse>(400, "잘못된 요청 (존재하지 않는 가게 / 입력값 오류)")
  @Response<ErrorResponse>(401, "인증 실패 (로그인 필요)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async createReview(
    @Request() req: ExpressRequest,
    @Body() body: CreateReviewBody
  ): Promise<any> {
    const user = req.user as { id: number }; // authorizeUser()가 주입한 JWT 유저
    return await reviewService.createReview({ ...body, user_id: user.id });
  }

  /**
   * 내 리뷰 목록을 조회합니다. (JWT 인증 필요)
   * Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
   */
  @Get("my")
  @Middlewares(authorizeUser())
  @Response<ErrorResponse>(401, "인증 실패 (로그인 필요)")
  @Response<ErrorResponse>(500, "서버 오류")
  public async getMyReviews(
    @Request() req: ExpressRequest
  ): Promise<any> {
    const user = req.user as { id: number }; // authorizeUser()가 주입한 JWT 유저
    return await reviewService.getMyReviews(user.id);
  }
}
