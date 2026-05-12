import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";

export const handleCreateMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  try {
    const mission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: mission });
  } catch (err: any) {
    if (err.message === "없는 가게입니다.") {
      res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
      return;
    }
    next(err);
  }
};

export const handleListStoreMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = parseInt(req.params.storeId as string);
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string)
      : undefined;

    const missions = await listStoreMissions({ storeId, cursor });
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (err) {
    next(err);
  }
};