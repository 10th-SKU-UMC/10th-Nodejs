import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user_mission.dto.js";
import { createUserMission } from "../services/user_mission.service.js";

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
