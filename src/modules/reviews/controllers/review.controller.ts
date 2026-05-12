import { Request, Response } from "express";
import { reviewService } from "../services/review.service";

export const createReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await reviewService.createReview(data);

    res.status(201).json({
      success: true,
      message: "리뷰 생성 성공",
      data: result,
    });
  } catch (error: any) {
    // 가게가 없거나 입력값 오류면 400
    if (
      error.message === "존재하지 않는 가게입니다." ||
      error.message === "별점과 리뷰 내용을 입력해주세요." ||
      error.message === "별점은 1~5 사이여야 합니다."
    ) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "리뷰 생성 실패",
      });
    }
  }
};
export const getMyReviews = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await reviewService.getMyReviews(userId);

    res.status(200).json({
      success: true,
      message: "내 리뷰 목록 조회 성공",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "조회 실패" });
  }
};