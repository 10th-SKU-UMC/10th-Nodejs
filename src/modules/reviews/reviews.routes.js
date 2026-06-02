const express = require('express');
const asyncHandler = require('../../common/middlewares/async-handler.middleware');
const { isLogin } = require('../../common/middlewares/auth.middleware');
const { sendControllerResult } = require('../../common/utils/controller-response.util');
const ReviewsController = require('./reviews.controller');

const router = express.Router();

router.post('/stores/:storeId/reviews', isLogin, asyncHandler(async (req, res) => {
  const controller = new ReviewsController();
  const result = await controller.createReview(req, req.params.storeId, req.body);

  return sendControllerResult(res, controller, result);
}));

router.get('/members/me/reviews', isLogin, asyncHandler(async (req, res) => {
  const controller = new ReviewsController();
  const result = await controller.getMyReviews(req, req.query);

  return sendControllerResult(res, controller, result);
}));

module.exports = router;
