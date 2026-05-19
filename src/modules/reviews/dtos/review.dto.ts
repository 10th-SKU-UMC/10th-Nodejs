export interface CreateReviewRequest {
  score: number;
  content: string;
  review_images: string[];
}

export interface ReviewCreateResponse {
  reviewId: number;
  score: number;
  content: string;
  review_images: {
    imageId: number;
    imageUrl: string;
  }[];
  createdAt: Date;
}

export interface ReviewListResponse {
  data: {
    id: number;
    content: string;
    score: number;
    user: {
      name: string;
    };
  }[];
  pagination: {
    cursor: number | null;
  };
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
