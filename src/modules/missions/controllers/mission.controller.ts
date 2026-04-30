import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, CreateMissionRequest } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const handleCreateMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params.storeId);
    const mission = await createMission(bodyToMission(req.body as CreateMissionRequest, storeId));

    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (err) {
    next(err);
  }
};
