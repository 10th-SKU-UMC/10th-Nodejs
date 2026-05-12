import express from "express";
import { createReview, getMyReviews} from "./controllers/review.controller";
import { handleListStoreReviews } from "../stores/controllers/store.controller"; 

const router = express.Router();

router.post("/stores/:storeId/reviews", createReview);  //특정 가게에 리뷰를 추가(ex. /stores/1/reviews))
router.get("/stores/:storeId/reviews", handleListStoreReviews);
router.get("/:userId/reviews", getMyReviews);

export default router;