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

export interface ReviewItem {
    id: number;
    content: string;
    score: number;
    user: {
        name: string;
    };
}

export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
        cursor: number | null;
    };
}

export const responseFromReviews = (
    reviews: ReviewItem[]
  ): ReviewListResponse => {
    const lastReview = reviews[reviews.length - 1];
  
    return {
      data: reviews,
      pagination: {
        cursor: lastReview ? lastReview.id : null,
      },
    };
};

export interface MyReviewItem {
    id: number;
    content: string;
    score: number;
    createdAt: Date | null;
    store: {
        id: number;
        name: string;
    };
    reviewImages: {
        id: number;
        imageUrl: string;
    }[];
}

export interface MyReviewListResponse {
    data: {
        reviewId: number;
        content: string;
        score: number;
        createdAt: Date | null;
        store: {
            storeId: number;
            name: string;
        };
        images: {
            imageId: number;
            imageUrl: string;
        }[];
    }[];
    pagination: {
        cursor: number | null;
    };
}

export const responseFromMyReviews = (
    reviews: MyReviewItem[]
): MyReviewListResponse => {
    const lastReview = reviews[reviews.length - 1];

    return {
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
            cursor: lastReview ? lastReview.id : null,
        },
    };
};
