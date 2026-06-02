const express = require('express');
const passport = require('../../config/passport');
const { UnauthorizedError } = require('../../common/errors/app.error');
const asyncHandler = require('../../common/middlewares/async-handler.middleware');
const { isLogin } = require('../../common/middlewares/auth.middleware');
const { success } = require('../../common/responses/api-response');
const { sendControllerResult } = require('../../common/utils/controller-response.util');
const MembersController = require('./members.controller');

const router = express.Router();

router.post('/auth/signup', asyncHandler(async (req, res) => {
  const controller = new MembersController();
  const result = await controller.signUp(req.body);

  return sendControllerResult(res, controller, result);
}));

router.post('/auth/login', asyncHandler(async (req, res) => {
  const controller = new MembersController();
  const result = await controller.login(req.body);

  return sendControllerResult(res, controller, result);
}));

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
}));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (error, result) => {
    if (error) {
      return next(error);
    }

    if (!result) {
      return next(new UnauthorizedError('Google 로그인이 실패했습니다.'));
    }

    return res.json(success(result));
  })(req, res, next);
});

router.get('/members/me', isLogin, asyncHandler(async (req, res) => {
  const controller = new MembersController();
  const result = await controller.getMyInfo(req);

  return sendControllerResult(res, controller, result);
}));

router.patch('/members/me', isLogin, asyncHandler(async (req, res) => {
  const controller = new MembersController();
  const result = await controller.updateMyInfo(req, req.body);

  return sendControllerResult(res, controller, result);
}));

module.exports = router;
