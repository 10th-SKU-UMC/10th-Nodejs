import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { storeService } from "../services/store.service";
import { listStoreReviews } from "../services/store.service";

export const createStore = async (req: Request, res: Response) => {
  try {
    const result = await storeService.createStore(req.body);

    return res.status(201).json({
      success: true,
      message: "가게 생성 성공",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "가게 생성 실패",
    });
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