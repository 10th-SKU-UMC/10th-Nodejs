const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/app.error');

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'chapter-09-access-secret';
const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '2h';

function createAccessToken(member) {
  return jwt.sign(
    {
      sub: member.id,
      name: member.name,
      authProvider: member.authProvider,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  );
}

function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return {
      id: Number(payload.sub),
      name: payload.name,
      authProvider: payload.authProvider,
    };
  } catch (error) {
    throw new UnauthorizedError('유효하지 않은 토큰입니다.');
  }
}

function currentMemberId(req) {
  if (!req.member?.id) {
    throw new UnauthorizedError('로그인이 필요한 API입니다.');
  }

  return req.member.id;
}

module.exports = {
  createAccessToken,
  verifyAccessToken,
  currentMemberId,
};
