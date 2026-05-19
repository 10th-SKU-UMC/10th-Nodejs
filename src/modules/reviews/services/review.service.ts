import {
  CreateReviewRequest,
  ReviewCreateResponse,
  MyReviewListResponse,
  ReviewListResponse,
} from "../dtos/review.dto.js";
import { addReview, addReviewImage } from "../repositories/review.repository.js";
import { getStoreById } from "../../stores/repositories/store.repository.js";
import { getStoreReviews, getUserReviews } from "../repositories/review.repository.js";
import { StoreNotFoundError } from "../../../common/errors/error.js";

export const createReview = async (
  storeId: number,
  data: CreateReviewRequest,
): Promise<ReviewCreateResponse> => {
  const store = await getStoreById(storeId);

  if (!store) {
    throw new StoreNotFoundError(storeId);
  }

  const reviewId = await addReview({
    storeId,
    userId: 1,
    score: data.score,
    content: data.content,
  });

  const reviewImages = data.review_images || [];
  const savedReviewImages = [];

  for (const reviewImage of reviewImages) {
    const reviewImageId = await addReviewImage(reviewId, reviewImage);
    savedReviewImages.push({
      imageId: reviewImageId,
      imageUrl: reviewImage,
    });
  }

  return <ReviewCreateResponse>{
    reviewId,
    score: data.score,
    content: data.content,
    review_images: savedReviewImages,
    createdAt: new Date(),
  };
};

export const listStoreReviews = async (
  storeId: number,
  cursor: number
): Promise<ReviewListResponse> => {
  const reviews = await getStoreReviews(storeId, cursor);
  const lastReview = reviews.at(-1);

  return <ReviewListResponse>{
    data: reviews,
    pagination: {
      cursor: lastReview?.id ?? null,
    },
  };
};

export const listMyReviews = async (
  userId: number,
  cursor: number
): Promise<MyReviewListResponse> => {
  const reviews = await getUserReviews(userId, cursor);
  const lastReview = reviews.at(-1);

  return <MyReviewListResponse>{
    data: reviews.map((review) => ({
      reviewId: review.id,
      content: review.content,
      score: review.score,
      createdAt: review.createdAt,
      store: {
        storeId: review.store.id,
        name: review.store.name,
      },
      images: review.reviewImages.map((image) => ({
        imageId: image.id,
        imageUrl: image.imageUrl,
      })),
    })),
    pagination: {
      cursor: lastReview?.id ?? null,
    },
  };
};
