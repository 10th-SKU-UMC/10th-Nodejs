export interface CreateReviewRequest {
  score: number;
  content: string;
  review_images: string[];
}

export const bodyToReview = (body: CreateReviewRequest, storeId: number) => {
  return {
    storeId,
    userId: 1,
    score: body.score,
    content: body.content,
    reviewImages: body.review_images || [],
  };
};

interface ReviewResponseInput {
  reviewId: number;
  createdAt: Date;
}

export const responseFromReview = ({ reviewId, createdAt }: ReviewResponseInput) => {
  return {
    reviewId,
    createdAt,
  };
};
