import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, CreateMissionRequest } from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";

export const handleCreateMission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params.storeId);
    const mission = await createMission(bodyToMission(req.body as CreateMissionRequest, storeId));

    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (err) {
    next(err);
  }
};

export const handleListStoreMissions = async (
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


    const missions = await listStoreMissions(storeId, cursor);

    res.status(StatusCodes.OK).json(missions);
  } catch (err) {
    next(err);
  }
};
