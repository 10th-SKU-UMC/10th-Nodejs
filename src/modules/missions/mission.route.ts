import express from "express";
import { createMission } from "./controllers/mission.controller";

const router = express.Router();

router.post("/stores/:storeId/missions", createMission);    //POST 요청 오면 createMission 실행

export default router;