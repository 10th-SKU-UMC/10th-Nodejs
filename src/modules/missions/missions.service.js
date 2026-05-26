const prisma = require('../../config/prisma');
const { ConflictError, NotFoundError } = require('../../common/errors/app.error');
const { now } = require('../../common/utils/date.util');

async function assertMission(missionId) {
  const mission = await prisma.mission.findUnique({ where: { id: missionId } });
  if (!mission) {
    throw new NotFoundError('존재하지 않는 미션입니다.');
  }
}

async function challengeMission(missionId, memberId) {
  await assertMission(missionId);

  const activeChallenge = await prisma.memberMission.findFirst({
    where: { memberId, missionId, status: 'IN_PROGRESS' },
  });
  if (activeChallenge) {
    throw new ConflictError('이미 도전 중인 미션입니다.');
  }

  return prisma.memberMission.create({
    data: {
      memberId,
      missionId,
      status: 'IN_PROGRESS',
      challengedAt: now(),
    },
  });
}

async function getInProgressMissions(memberId, { limit, cursor }) {
  const where = {
    memberId,
    status: 'IN_PROGRESS',
  };
  if (cursor) {
    where.id = { lt: cursor };
  }

  return prisma.memberMission.findMany({
    where,
    orderBy: { id: 'desc' },
    take: limit,
    include: {
      mission: {
        include: { store: true },
      },
    },
  });
}

async function completeChallenge(missionId, memberId) {
  const challenge = await prisma.memberMission.findFirst({
    where: { memberId, missionId, status: 'IN_PROGRESS' },
  });
  if (!challenge) {
    throw new NotFoundError('진행 중인 미션이 아닙니다.');
  }

  return prisma.memberMission.update({
    where: { id: challenge.id },
    data: { status: 'COMPLETED' },
  });
}

module.exports = {
  challengeMission,
  getInProgressMissions,
  completeChallenge,
};
