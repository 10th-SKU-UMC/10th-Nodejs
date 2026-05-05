const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, '..', 'data', 'app.db');
const db = new sqlite3.Database(dbPath);

app.use(express.json());

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function currentMemberId() {
  return 1;
}

function isPositiveInt(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

app.post('/api/v1/regions/:regionId/stores', async (req, res, next) => {
  try {
    const regionId = Number(req.params.regionId);
    const { name, address } = req.body;

    if (!isPositiveInt(regionId) || !name || !address) {
      return res.status(400).json({ message: 'regionId, name, address를 확인해 주세요.' });
    }

    const region = await get('SELECT id FROM regions WHERE id = ?', [regionId]);
    if (!region) {
      return res.status(404).json({ message: '존재하지 않는 지역입니다.' });
    }

    const result = await run(
      'INSERT INTO stores (region_id, name, address) VALUES (?, ?, ?)',
      [regionId, name, address]
    );
    const store = await get('SELECT * FROM stores WHERE id = ?', [result.id]);

    return res.status(201).json({ data: store });
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
      return res.status(400).json({ message: 'storeId, rating(1~5), content를 확인해 주세요.' });
    }

    const store = await get('SELECT id FROM stores WHERE id = ?', [storeId]);
    if (!store) {
      return res.status(404).json({ message: '존재하지 않는 가게입니다.' });
    }

    const result = await run(
      'INSERT INTO reviews (store_id, member_id, rating, content, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
      [storeId, memberId, rating, content]
    );
    const review = await get('SELECT * FROM reviews WHERE id = ?', [result.id]);

    return res.status(201).json({ data: review });
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/stores/:storeId/missions', async (req, res, next) => {
  try {
    const storeId = Number(req.params.storeId);
    const { title, reward, deadline } = req.body;

    if (!isPositiveInt(storeId) || !title || !isPositiveInt(reward) || !deadline) {
      return res.status(400).json({ message: 'storeId, title, reward, deadline을 확인해 주세요.' });
    }

    const store = await get('SELECT id FROM stores WHERE id = ?', [storeId]);
    if (!store) {
      return res.status(404).json({ message: '존재하지 않는 가게입니다.' });
    }

    const result = await run(
      'INSERT INTO missions (store_id, title, reward, deadline, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
      [storeId, title, reward, deadline]
    );
    const mission = await get('SELECT * FROM missions WHERE id = ?', [result.id]);

    return res.status(201).json({ data: mission });
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/missions/:missionId/challenges', async (req, res, next) => {
  try {
    const missionId = Number(req.params.missionId);
    const memberId = currentMemberId();

    if (!isPositiveInt(missionId)) {
      return res.status(400).json({ message: 'missionId를 확인해 주세요.' });
    }

    const mission = await get('SELECT id FROM missions WHERE id = ?', [missionId]);
    if (!mission) {
      return res.status(404).json({ message: '존재하지 않는 미션입니다.' });
    }

    const activeChallenge = await get(
      'SELECT id FROM member_missions WHERE member_id = ? AND mission_id = ? AND status = ?',
      [memberId, missionId, 'IN_PROGRESS']
    );
    if (activeChallenge) {
      return res.status(409).json({ message: '이미 도전 중인 미션입니다.' });
    }

    const result = await run(
      'INSERT INTO member_missions (member_id, mission_id, status, challenged_at) VALUES (?, ?, ?, datetime("now"))',
      [memberId, missionId, 'IN_PROGRESS']
    );
    const challenge = await get('SELECT * FROM member_missions WHERE id = ?', [result.id]);

    return res.status(201).json({ data: challenge });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server running: http://localhost:${PORT}`);
});
