import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createReview } from "../services/review.service.js";

export const handleReviewCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId as string);

    const result = await createReview(restaurantId, req.body);

    res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      message: "리뷰가 성공적으로 등록되었습니다.",
      result,
    });
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      message: err.message || "리뷰 등록 중 오류가 발생했습니다.",
    });
  }
};
