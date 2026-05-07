import { Request, Response } from "express";
import { missionService } from "../services/mission.service";

export const createMission = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await missionService.createMission(data);

    res.status(201).json({
      success: true,
      message: "미션 생성 성공",
      data: result,
    });
  } catch (error: any) {
    if (
      error.message === "존재하지 않는 가게입니다." ||
      error.message === "미션 제목, 보상 포인트, 마감일을 입력해주세요." ||
      error.message === "보상 포인트는 0보다 커야 합니다."
    ) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "미션 생성 실패",
      });
    }
  }
};

export const getStoreMissions = async (req: Request, res: Response) => {
  try {
    const storeId = parseInt(req.params.storeId as string);
    const result = await missionService.getStoreMissions(storeId);
    res.status(200).json({
      success: true,
      message: "가게 미션 목록 조회 성공",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "존재하지 않는 가게입니다.") {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "미션 목록 조회 실패" });
    }
  }
};