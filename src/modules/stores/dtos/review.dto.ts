export interface ReviewCreateRequest {
  content: string;
  img?: string;
  countStar: "1" | "2" | "3" | "4" | "5";
  userId: number;
  storeName: string;
}

export const bodyToReview = (body: ReviewCreateRequest) => {
  return {
    content: body.content,
    img: body.img ?? null,
    countStar: body.countStar,
    userId: body.userId,
    storeName: body.storeName,
  };
};

export interface ReviewCreateResponse {
  reviewId: number;
  content: string;
  img: string | null;
  countStar: string;
  userId: number;
  storeId: number;
  storeName: string;
}

export const responseFromReview = ({
  review,
  store,
}: {
  review: any;
  store: any;
}): ReviewCreateResponse => {
  return {
    reviewId: review.review_id,
    content: review.content,
    img: review.img,
    countStar: review.count_star,
    userId: review.user_id,
    storeId: store.store_id,
    storeName: store.name,
  };
};

//get review
export interface ReviewItem {
  nickname: string;    // 닉네임
  countStar: string;   // 별점
  createdAt: Date;     // 리뷰 작성 날짜
  content: string;     // 리뷰 상세 내용
  cursor: number;      // 페이지네이션용 id
}

export interface ReviewListResponse {
  data: Omit<ReviewItem, "cursor">[];
  pagination: {
    cursor: number | null;
  };
}

 export const responseFromReviews = (
    reviews: ReviewItem[]
  ): ReviewListResponse => {
    const lastReview = reviews[reviews.length - 1];
  
    return {
    data: reviews.map(({ cursor, ...rest }) => rest),
    pagination: {
      cursor: lastReview ? lastReview.cursor : null,
    },
  };
  };