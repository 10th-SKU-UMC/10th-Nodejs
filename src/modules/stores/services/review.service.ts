import { prisma } from "../../../db.config.js";
import { responseFromReview, responseAllFromReview } from "../dtos/review.dto.js";
import {
  getStoreByName,
  addReview,
  getReview,
  getAllStoreReviews
} from "../repositories/review.repository.js";

export const createReview = async (data: {
  content: string;
  img: string | null;
  countStar: string;
  userId: number;
  storeName: string;
}) => {
  const store = await getStoreByName(data.storeName);
  if (store === null) {
    throw new Error("없는 가게입니다.");
  }

  const review = await prisma.$transaction(async (tx) => {
    const reviewId = await addReview(
      {
        content: data.content,
        img: data.img,
        countStar: data.countStar,
        userId: data.userId,
        storeId: store.storeId,
      },
      tx
    );
    return await getReview(reviewId, tx);
  });

  return responseFromReview({ review, store });
};

export const listStoreReviews = async ({
  storeId,
  cursor,
}: {
  storeId: number;
  cursor?: number;
}) => {
  const reviews = await getAllStoreReviews({
    storeId: BigInt(storeId),
    cursor,
    take: 5,
  });

  return responseAllFromReview(reviews);
};