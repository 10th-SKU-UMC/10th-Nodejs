const { UnauthorizedError } = require('../errors/app.error');
const { verifyAccessToken } = require('../utils/auth.util');

function isLogin(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError('로그인이 필요한 API입니다.');
  }

  const [type, token] = authorization.split(' ');
  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedError('Bearer 토큰 형식이 올바르지 않습니다.');
  }

  req.member = verifyAccessToken(token);
  return next();
}

module.exports = {
  isLogin,
};
