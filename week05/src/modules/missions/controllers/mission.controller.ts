import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { addMissionService } from "../services/mission.service";

export const addMission = async(req: Request, res: Response, next:NextFunction) => {
    try{
        const {storeId} = req.params;
        const missionData = req.body;
        console.log("==가게 미션 추가 요청==");
        console.log("요청 가게 번호 :", req.body);

        const newMissionId = await addMissionService(Number(storeId), missionData);

        res.status(StatusCodes.OK).json({
            isSuccess: true,
            message: `생성완료`,
            data: req.body
        });
    }   catch (error) {
        console.error("가게 추가 중 에러 발생: ", error);
        res.status(400).json({
            isSuccess: false,
            message: "미션 추가 중 오류 발생"
        });
    };
};