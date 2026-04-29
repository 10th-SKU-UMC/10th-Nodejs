import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMissionState } from "../dtos/mission_state.dto.js";
import { challengeMission } from "../services/mission_state.service.js";

export const handleChallengeMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("미션 도전을 요청했습니다!");
  console.log("body:", req.body);

  try {
    const missionState = await challengeMission(bodyToMissionState(req.body));
    res.status(StatusCodes.OK).json({ result: missionState });
  } catch (err: any) {
    if (err.message === "없는 미션입니다.") {
      res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
      return;
    }
    if (err.message === "이미 도전 중인 미션입니다.") {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      return;
    }
    next(err);
  }
};