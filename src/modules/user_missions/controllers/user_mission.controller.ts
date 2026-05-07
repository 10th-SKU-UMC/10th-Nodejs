import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user_mission.dto.js";
import {
  completeInProgressUserMission,
  createUserMission,
  listInProgressUserMissions,
} from "../services/user_mission.service.js";

export const handleCreateUserMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId);
    const missionId = Number(req.params.missionId);
    const userMission = await createUserMission(bodyToUserMission(userId, missionId));

    res.status(StatusCodes.CREATED).json({ result: userMission });
  } catch (err) {
    next(err);
  }
};

export const handleListInProgressUserMissions = async (
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

    const userMissions = await listInProgressUserMissions(userId, cursor);

    res.status(StatusCodes.OK).json(userMissions);
  } catch (err) {
    next(err);
  }
};

export const handleCompleteUserMission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId as string, 10);
    const missionId = parseInt(req.params.missionId as string, 10);
    const userMission = await completeInProgressUserMission(userId, missionId);

    res.status(StatusCodes.OK).json({ result: userMission });
  } catch (err) {
    next(err);
  }
};
