const prisma = require('../../config/prisma');
const { now } = require('../../common/utils/date.util');
const { assertStore } = require('../stores/stores.service');

async function createReview(storeId, memberId, { rating, content }) {
  await assertStore(storeId);

  return prisma.review.create({
    data: {
      storeId,
      memberId,
      rating: Number(rating),
      content,
      createdAt: now(),
    },
  });
}

async function getMemberReviews(memberId, { limit, cursor }) {
  const where = { memberId };
  if (cursor) {
    where.id = { lt: cursor };
  }

  return prisma.review.findMany({
    where,
    orderBy: { id: 'desc' },
    take: limit,
    include: { store: true },
  });
}

module.exports = {
  createReview,
  getMemberReviews,
};
