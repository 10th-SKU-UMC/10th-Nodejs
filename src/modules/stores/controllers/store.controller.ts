import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, CreateStoreRequest } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

export const handleCreateStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regionId = Number(req.params.regionId);
    const store = await createStore(bodyToStore(req.body as CreateStoreRequest, regionId));

    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (err) {
    next(err);
  }
};
