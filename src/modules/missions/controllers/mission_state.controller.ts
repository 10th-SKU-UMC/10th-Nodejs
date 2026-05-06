import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMissionState } from "../dtos/mission_state.dto.js";
import { challengeMission, listUserMissions } from "../services/mission_state.service.js";

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

export const handleListUserMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId as string);
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string)
      : undefined;

    const missions = await listUserMissions({ userId, cursor });
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (err) {
    next(err);
  }
};