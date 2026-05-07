import { reviewRepository } from "../repositories/review.repository";
import { storeRepository } from "../../stores/repositories/store.repository";
import { CreateReviewRequest } from "../dtos/review.dto";

export const reviewService = {
  async createReview(data: CreateReviewRequest) {

    // 가게 조회는 storeRepository
    const store = await storeRepository.findStoreById(data.store_id);
    if (!store) {
      throw new Error("존재하지 않는 가게입니다.");
    }

    if (!data.score || !data.content) {
      throw new Error("별점과 리뷰 내용을 입력해주세요.");
    }

    if (data.score < 1 || data.score > 5) {
      throw new Error("별점은 1~5 사이여야 합니다.");
    }

    const reviewId = await reviewRepository.createReview(data);

    return {
      id: reviewId,
      ...data,
    };
  },

  async getMyReviews(user_id: number) {
    const reviews = await reviewRepository.getReviewsByUserId(user_id);
    return reviews;
  },
};