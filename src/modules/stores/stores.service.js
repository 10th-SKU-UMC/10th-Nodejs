const prisma = require('../../config/prisma');
const { NotFoundError } = require('../../common/errors/app.error');
const { now } = require('../../common/utils/date.util');

async function assertRegion(regionId) {
  const region = await prisma.region.findUnique({ where: { id: regionId } });
  if (!region) {
    throw new NotFoundError('존재하지 않는 지역입니다.');
  }
}

async function assertStore(storeId) {
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) {
    throw new NotFoundError('존재하지 않는 가게입니다.');
  }
}

async function createStore(regionId, { name, address }) {
  await assertRegion(regionId);

  return prisma.store.create({
    data: { regionId, name, address },
  });
}

async function createMission(storeId, { title, reward, deadline }) {
  await assertStore(storeId);

  return prisma.mission.create({
    data: {
      storeId,
      title,
      reward: Number(reward),
      deadline,
      createdAt: now(),
    },
  });
}

async function getStoreMissions(storeId, { limit, cursor }) {
  await assertStore(storeId);

  const where = { storeId };
  if (cursor) {
    where.id = { lt: cursor };
  }

  return prisma.mission.findMany({
    where,
    orderBy: { id: 'desc' },
    take: limit,
  });
}

module.exports = {
  assertStore,
  createStore,
  createMission,
  getStoreMissions,
};
