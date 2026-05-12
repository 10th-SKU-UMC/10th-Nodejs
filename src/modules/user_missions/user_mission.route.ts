import express from "express";
import { createUserMission, getChallengingMissions, completeMission, } from "./controllers/user_mission.controller";

const router = express.Router();

router.post("/missions/:missionId/challenge", createUserMission);
router.get("/users/:userId/missions/challenging", getChallengingMissions);
router.patch("/user-missions/:userMissionId/complete", completeMission);

export default router;

