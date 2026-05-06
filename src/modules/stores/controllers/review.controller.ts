import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, listStoreReviews, listUserReviews } from "../services/review.service.js";

export const handleCreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  try {
    const review = await createReview(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ result: review });
  } catch (err: any) {
    if (err.message === "없는 가게입니다.") {
      res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
      return;
    }
    next(err);
  }
};


export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = parseInt(req.params.storeId as string);
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string)
      : undefined;

    const reviews = await listStoreReviews({ storeId, cursor });
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (err) {
    next(err);
  }
};


export const handleListUserReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId as string);
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string)
      : undefined;

    const reviews = await listUserReviews({ userId, cursor });
    res.status(StatusCodes.OK).json({ result: reviews });
  } catch (err) {
    next(err);
  }
};