const express = require('express');
const asyncHandler = require('../../common/middlewares/async-handler.middleware');
const { isLogin } = require('../../common/middlewares/auth.middleware');
const { sendControllerResult } = require('../../common/utils/controller-response.util');
const MissionsController = require('./missions.controller');

const router = express.Router();

router.post('/missions/:missionId/challenges', isLogin, asyncHandler(async (req, res) => {
  const controller = new MissionsController();
  const result = await controller.challengeMission(req, req.params.missionId);

  return sendControllerResult(res, controller, result);
}));

router.get('/members/me/missions', isLogin, asyncHandler(async (req, res) => {
  const controller = new MissionsController();
  const result = await controller.getMyInProgressMissions(req, req.query);

  return sendControllerResult(res, controller, result);
}));

router.patch('/missions/:missionId/challenges/complete', isLogin, asyncHandler(async (req, res) => {
  const controller = new MissionsController();
  const result = await controller.completeChallenge(req, req.params.missionId);

  return sendControllerResult(res, controller, result);
}));

module.exports = router;
