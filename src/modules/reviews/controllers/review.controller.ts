import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview, CreateReviewRequest } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

export const handleCreateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params.storeId);
    const review = await createReview(bodyToReview(req.body as CreateReviewRequest, storeId));

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (err) {
    next(err);
  }
};
