import express from "express";
import { createReview } from "./controllers/review.controller";

const router = express.Router();

router.post("/stores/:storeId/reviews", createReview);  //특정 가게에 리뷰를 추가(ex. /stores/1/reviews))

export default router;