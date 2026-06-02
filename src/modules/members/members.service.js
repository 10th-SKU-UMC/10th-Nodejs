const bcrypt = require('bcryptjs');
const prisma = require('../../config/prisma');
const { BadRequestError, ConflictError, NotFoundError } = require('../../common/errors/app.error');
const { createAccessToken } = require('../../common/utils/auth.util');

const PASSWORD_SALT_ROUNDS = 10;

function sanitizeMember(member) {
  const { password, ...safeMember } = member;
  return safeMember;
}

function issueToken(member) {
  return {
    accessToken: createAccessToken(member),
    member: sanitizeMember(member),
  };
}

async function signUp({ email, password, name, phone, birthday }) {
  if (!email || !password || !name) {
    throw new BadRequestError('email, password, name을 확인해 주세요.');
  }

  const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  const existingMember = await prisma.member.findUnique({ where: { email } });

  if (existingMember) {
    if (existingMember.authProvider !== 'LOCAL') {
      throw new ConflictError('다른 로그인 방식으로 가입된 이메일입니다.');
    }

    const member = await prisma.member.update({
      where: { id: existingMember.id },
      data: {
        name,
        password: passwordHash,
        phone: phone || existingMember.phone,
        birthday: birthday || existingMember.birthday,
      },
    });

    return issueToken(member);
  }

  const member = await prisma.member.create({
    data: {
      email,
      password: passwordHash,
      name,
      phone,
      birthday,
      authProvider: 'LOCAL',
    },
  });

  return issueToken(member);
}

async function login({ email, password }) {
  if (!email || !password) {
    throw new BadRequestError('email, password를 확인해 주세요.');
  }

  const member = await prisma.member.findUnique({ where: { email } });
  if (!member || member.authProvider !== 'LOCAL') {
    throw new NotFoundError('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  const isValidPassword = await bcrypt.compare(password, member.password || '');
  if (!isValidPassword) {
    throw new NotFoundError('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  return issueToken(member);
}

async function loginWithGoogle(profile) {
  const email = profile.emails?.[0]?.value;
  const name = profile.displayName || email;

  if (!email) {
    throw new BadRequestError('Google 계정 이메일을 확인할 수 없습니다.');
  }

  const existingMember = await prisma.member.findUnique({ where: { email } });
  if (existingMember) {
    if (existingMember.authProvider !== 'GOOGLE') {
      throw new ConflictError('다른 로그인 방식으로 가입된 이메일입니다.');
    }

    return issueToken(existingMember);
  }

  const member = await prisma.member.create({
    data: {
      email,
      name,
      authProvider: 'GOOGLE',
    },
  });

  return issueToken(member);
}

async function getMyInfo(memberId) {
  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) {
    throw new NotFoundError('존재하지 않는 회원입니다.');
  }

  return sanitizeMember(member);
}

async function updateMyInfo(memberId, { name, phone, birthday }) {
  const data = {};
  if (name !== undefined) data.name = name;
  if (phone !== undefined) data.phone = phone;
  if (birthday !== undefined) data.birthday = birthday;

  if (Object.keys(data).length === 0) {
    throw new BadRequestError('수정할 회원 정보를 입력해 주세요.');
  }

  const member = await prisma.member.update({
    where: { id: memberId },
    data,
  });

  return sanitizeMember(member);
}

module.exports = {
  signUp,
  login,
  loginWithGoogle,
  getMyInfo,
  updateMyInfo,
};
