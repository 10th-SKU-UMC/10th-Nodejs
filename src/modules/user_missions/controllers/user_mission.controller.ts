import { Request, Response } from "express";
import { userMissionService } from "../services/user_mission.service";

export const createUserMission = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await userMissionService.createUserMission(data);

    res.status(201).json({
      success: true,
      message: "미션 도전 성공",
      data: result,
    });
  } catch (error: any) {
    if (
      error.message === "존재하지 않는 미션입니다." ||
      error.message === "이미 도전 중인 미션입니다."
    ) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "미션 도전 실패",
      });
    }
  }
};

export const getChallengingMissions = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.userId); // URL에서 userId 꺼내기

    const result = await userMissionService.getChallengingMissions(user_id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "미션 목록 조회 실패",
    });
  }
};

export const completeMission = async (req: Request, res: Response) => {
  try {
    const user_mission_id = Number(req.params.userMissionId);

    const result = await userMissionService.completeMission(user_mission_id);

    res.status(200).json({
      success: true,
      message: "미션 완료 처리 성공",
      data: result,
    });
  } catch (error: any) {
    if (
      error.message === "존재하지 않는 미션입니다." ||
      error.message === "이미 완료된 미션입니다."
    ) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "미션 완료 처리 실패",
      });
    }
  }
};