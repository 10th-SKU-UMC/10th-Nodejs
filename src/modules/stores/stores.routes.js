const express = require('express');
const asyncHandler = require('../../common/middlewares/async-handler.middleware');
const { sendControllerResult } = require('../../common/utils/controller-response.util');
const StoresController = require('./stores.controller');

const router = express.Router();

router.post('/regions/:regionId/stores', asyncHandler(async (req, res) => {
  const controller = new StoresController();
  const result = await controller.createStore(req.params.regionId, req.body);

  return sendControllerResult(res, controller, result);
}));

router.post('/stores/:storeId/missions', asyncHandler(async (req, res) => {
  const controller = new StoresController();
  const result = await controller.createMission(req.params.storeId, req.body);

  return sendControllerResult(res, controller, result);
}));

router.get('/stores/:storeId/missions', asyncHandler(async (req, res) => {
  const controller = new StoresController();
  const result = await controller.getMissions(req.params.storeId, req.query);

  return sendControllerResult(res, controller, result);
}));

module.exports = router;
