import express from "express";
import { createUserMission } from "./controllers/user_mission.controller";

const router = express.Router();

router.post("/missions/:missionId/challenge", createUserMission);

export default router;

