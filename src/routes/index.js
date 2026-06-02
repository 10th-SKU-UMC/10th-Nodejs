const express = require('express');
const storesRouter = require('../modules/stores/stores.routes');
const reviewsRouter = require('../modules/reviews/reviews.routes');
const missionsRouter = require('../modules/missions/missions.routes');
const membersRouter = require('../modules/members/members.routes');

const router = express.Router();

router.use(membersRouter);
router.use(storesRouter);
router.use(reviewsRouter);
router.use(missionsRouter);

module.exports = router;
