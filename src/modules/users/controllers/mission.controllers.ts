import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createMission } from "../services/mission.service.js";

export const handleMissionCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId as string);

    // 서비스 호출
    const result = await createMission(restaurantId, req.body);

    res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      message: "미션이 성공적으로 등록되었습니다.",
      result,
    });
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      message: err.message || "미션 등록 중 오류가 발생했습니다.",
    });
  }
};
