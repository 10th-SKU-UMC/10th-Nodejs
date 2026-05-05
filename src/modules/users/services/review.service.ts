import { addReview, getReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const createReview = async (restaurantId: number, data: any) => {
  // 1. 레포지토리를 통해 리뷰 저장
  const reviewId = await addReview(restaurantId, data);

  // 2. 저장된 리뷰 데이터 가져오기
  const review = await getReview(reviewId);

  // 3. DTO를 통해 응답 형식으로 변환하여 반환
  return responseFromReview(review);
};
