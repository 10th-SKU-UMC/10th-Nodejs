import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { addStoreService } from "../services/store.service.js";

export const addStore = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {regionId} = req.params; //url에 적힌 지역코드 가져오기
        const storeData = req.body;
        console.log("==특정 지역 가게 추가 요청==");
        console.log("요청 지역 번호 :", regionId);
        console.log("요청 가게 번호 :", req.body);

        const newStoreId = await addStoreService(Number(regionId), storeData);

        res.status(StatusCodes.OK).json({
            isSuccess: true,
            message: `생성완료`,
            data: req.body
        });
    } catch (error) {
        console.error("가게 추가 중 에러 발생: ",error);
        res.status(400).json({
            isSuccess: false,
            message: "추가 중 오류 발생"
        });
    };
}