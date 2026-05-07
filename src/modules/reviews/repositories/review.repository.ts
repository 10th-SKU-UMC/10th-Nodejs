import { prisma } from "../../../db.config.js";

export const addReview = async (data: any): Promise<number> => {
  try {
    const review = await prisma.review.create({
      data: {
        userId: data.userId,
        storeId: data.storeId,
        score: data.score,
        content: data.content,
      },
    });

    return review.id;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const addReviewImage = async (reviewId: number, imageUrl: string): Promise<void> => {
  try {
    await prisma.reviewImage.create({
      data: {
        reviewId,
        imageUrl,
      },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const getStoreReviews = async (storeId: number, cursor: number) => {
  return await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      score: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    where: {
      storeId,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });
};

export const getUserReviews = async (userId: number, cursor: number) => {
  return await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      score: true,
      createdAt: true,
      store: {
        select: {
          id: true,
          name: true,
        },
      },
      reviewImages: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
    where: {
      userId,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });
};
