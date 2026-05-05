import { responseFromReview } from "../dtos/review.dto.js";
import { addReview, addReviewImage } from "../repositories/review.repository.js";
import { getStoreById } from "../../stores/repositories/store.repository.js";

export const createReview = async (data: any) => {
  const store = await getStoreById(data.storeId);

  if (!store) {
    throw new Error("리뷰를 작성할 가게가 존재하지 않습니다.");
  }

  const reviewId = await addReview(data);

  for (const reviewImage of data.reviewImages) {
    await addReviewImage(reviewId, reviewImage);
  }

  return responseFromReview({
    reviewId,
    createdAt: new Date(),
  });
};
