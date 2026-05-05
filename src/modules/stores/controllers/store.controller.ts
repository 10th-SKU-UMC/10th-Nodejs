import { Request, Response } from "express";
import { storeService } from "../services/store.service";

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