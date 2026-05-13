const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { BadRequestError, ConflictError, NotFoundError } = require('./common/errors/app.error');
const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

function currentMemberId() {
  return 1;
}

function isPositiveInt(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

function now() {
  return new Date().toISOString();
}

function getListOptions(req) {
  const limit = Number(req.query.limit || 10);
  const cursor = req.query.cursor ? Number(req.query.cursor) : null;

  if (!isPositiveInt(limit) || limit > 50) {
    return null;
  }

  if (cursor !== null && !isPositiveInt(cursor)) {
    return null;
  }

  return { limit, cursor };
}

function success(data) {
  return {
    resultType: 'SUCCESS',
    error: null,
    data,
  };
}

function fail({ errorCode = 'UNKNOWN', message = '서버 오류가 발생했습니다.', data = null } = {}) {
  return {
    resultType: 'FAIL',
    error: {
      errorCode,
      message,
      data,
    },
    data: null,
  };
}

app.post('/api/v1/regions/:regionId/stores', async (req, res, next) => {
  try {
    const regionId = Number(req.params.regionId);
    const { name, address } = req.body;

    if (!isPositiveInt(regionId) || !name || !address) {
      throw new BadRequestError('regionId, name, address를 확인해 주세요.');
    }

    const region = await prisma.region.findUnique({ where: { id: regionId } });
    if (!region) {
      throw new NotFoundError('존재하지 않는 지역입니다.');
    }

    const store = await prisma.store.create({
      data: { regionId, name, address },
    });

    return res.status(201).json(success(store));
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/stores/:storeId/reviews', async (req, res, next) => {
  try {
    const storeId = Number(req.params.storeId);
    const memberId = currentMemberId();
    const { rating, content } = req.body;

    if (!isPositiveInt(storeId) || !isPositiveInt(rating) || rating > 5 || !content) {
      throw new BadRequestError('storeId, rating(1~5), content를 확인해 주세요.');
    }

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      throw new NotFoundError('존재하지 않는 가게입니다.');
    }

    const review = await prisma.review.create({
      data: {
        storeId,
        memberId,
        rating: Number(rating),
        content,
        createdAt: now(),
      },
    });

    return res.status(201).json(success(review));
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/stores/:storeId/missions', async (req, res, next) => {
  try {
    const storeId = Number(req.params.storeId);
    const { title, reward, deadline } = req.body;

    if (!isPositiveInt(storeId) || !title || !isPositiveInt(reward) || !deadline) {
      throw new BadRequestError('storeId, title, reward, deadline을 확인해 주세요.');
    }

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      throw new NotFoundError('존재하지 않는 가게입니다.');
    }

    const mission = await prisma.mission.create({
      data: {
        storeId,
        title,
        reward: Number(reward),
        deadline,
        createdAt: now(),
      },
    });

    return res.status(201).json(success(mission));
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/missions/:missionId/challenges', async (req, res, next) => {
  try {
    const missionId = Number(req.params.missionId);
    const memberId = currentMemberId();

    if (!isPositiveInt(missionId)) {
      throw new BadRequestError('missionId를 확인해 주세요.');
    }

    const mission = await prisma.mission.findUnique({ where: { id: missionId } });
    if (!mission) {
      throw new NotFoundError('존재하지 않는 미션입니다.');
    }

    const activeChallenge = await prisma.memberMission.findFirst({
      where: { memberId, missionId, status: 'IN_PROGRESS' },
    });
    if (activeChallenge) {
      throw new ConflictError('이미 도전 중인 미션입니다.');
    }

    const challenge = await prisma.memberMission.create({
      data: {
        memberId,
        missionId,
        status: 'IN_PROGRESS',
        challengedAt: now(),
      },
    });

    return res.status(201).json(success(challenge));
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/members/me/reviews', async (req, res, next) => {
  try {
    const memberId = currentMemberId();
    const options = getListOptions(req);

    if (!options) {
      throw new BadRequestError('limit, cursor를 확인해 주세요.');
    }

    const where = { memberId };
    if (options.cursor) {
      where.id = { lt: options.cursor };
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { id: 'desc' },
      take: options.limit,
      include: { store: true },
    });

    return res.json(success(reviews));
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/stores/:storeId/missions', async (req, res, next) => {
  try {
    const storeId = Number(req.params.storeId);
    const options = getListOptions(req);

    if (!isPositiveInt(storeId) || !options) {
      throw new BadRequestError('storeId, limit, cursor를 확인해 주세요.');
    }

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      throw new NotFoundError('존재하지 않는 가게입니다.');
    }

    const where = { storeId };
    if (options.cursor) {
      where.id = { lt: options.cursor };
    }

    const missions = await prisma.mission.findMany({
      where,
      orderBy: { id: 'desc' },
      take: options.limit,
    });

    return res.json(success(missions));
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/members/me/missions', async (req, res, next) => {
  try {
    const memberId = currentMemberId();
    const options = getListOptions(req);

    if (!options) {
      throw new BadRequestError('limit, cursor를 확인해 주세요.');
    }

    const where = {
      memberId,
      status: 'IN_PROGRESS',
    };
    if (options.cursor) {
      where.id = { lt: options.cursor };
    }

    const challenges = await prisma.memberMission.findMany({
      where,
      orderBy: { id: 'desc' },
      take: options.limit,
      include: {
        mission: {
          include: { store: true },
        },
      },
    });

    return res.json(success(challenges));
  } catch (err) {
    next(err);
  }
});

app.patch('/api/v1/missions/:missionId/challenges/complete', async (req, res, next) => {
  try {
    const missionId = Number(req.params.missionId);
    const memberId = currentMemberId();

    if (!isPositiveInt(missionId)) {
      throw new BadRequestError('missionId를 확인해 주세요.');
    }

    const challenge = await prisma.memberMission.findFirst({
      where: { memberId, missionId, status: 'IN_PROGRESS' },
    });
    if (!challenge) {
      throw new NotFoundError('진행 중인 미션이 아닙니다.');
    }

    const completedChallenge = await prisma.memberMission.update({
      where: { id: challenge.id },
      data: { status: 'COMPLETED' },
    });

    return res.json(success(completedChallenge));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json(
    fail({
      errorCode: err.errorCode,
      message: err.message,
      data: err.data,
    }),
  );
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server running: http://localhost:${PORT}`);
});
