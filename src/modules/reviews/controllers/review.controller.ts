import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview, CreateReviewRequest } from "../dtos/review.dto.js";
import { createReview, listMyReviews, listStoreReviews } from "../services/review.service.js";

export const handleCreateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params.storeId);
    const review = await createReview(bodyToReview(req.body as CreateReviewRequest, storeId));

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (err) {
    next(err);
  }
};

export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);
    const cursor =
    typeof req.query.cursor === "string"
      ? parseInt(req.query.cursor, 10)
      : 0;

    const reviews = await listStoreReviews(storeId, cursor);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};

export const handleListMyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId as string, 10);
    const cursor =
      typeof req.query.cursor === "string"
        ? parseInt(req.query.cursor, 10)
        : 0;

    const reviews = await listMyReviews(userId, cursor);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};
