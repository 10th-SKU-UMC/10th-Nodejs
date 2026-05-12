import { prisma } from "../../../db.config.js";

export const reviewRepository = {
  async createReview(data: any) {
    const review = await prisma.userStoreReview.create({
      data: {
        userId: data.user_id,
        storeId: data.store_id,
        score: data.score,   
        content: data.content,
      },
    });
    return review.id;
  },


//내가 작성한 리뷰 목록 조회
  async getReviewsByUserId(user_id: number) {
    return await prisma.userStoreReview.findMany({
      where: { userId: user_id },
      include: {  //가게이름까지 가져옴
        store: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
};