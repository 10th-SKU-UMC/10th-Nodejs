export interface CreateReviewRequest {
  /** 리뷰 평점 */
  score: number;
  /** 리뷰 내용 */
  content: string;
  /** 리뷰 이미지 URL 배열 */
  review_images: string[];
}

export interface ReviewCreateResponse {
  /** 리뷰 ID */
  reviewId: number;
  /** 리뷰 평점 */
  score: number;
  /** 리뷰 내용 */
  content: string;
  /** 리뷰 이미지 목록 */
  review_images: {
    /** 리뷰 이미지 ID */
    imageId: number;
    /** 리뷰 이미지 URL */
    imageUrl: string;
  }[];
  /** 리뷰 생성일 */
  createdAt: Date;
}

export interface ReviewListResponse {
  /** 리뷰 목록 */
  data: {
    /** 리뷰 ID */
    id: number;
    /** 리뷰 내용 */
    content: string;
    /** 리뷰 평점 */
    score: number;
    /** 리뷰 작성자 정보 */
    user: {
      /** 리뷰 작성자 이름 */
      name: string;
    };
  }[];
  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 페이지 조회에 사용할 커서 */
    cursor: number | null;
  };
}

export interface MyReviewListResponse {
  /** 내 리뷰 목록 */
  data: {
    /** 리뷰 ID */
    reviewId: number;
    /** 리뷰 내용 */
    content: string;
    /** 리뷰 평점 */
    score: number;
    /** 리뷰 생성일 */
    createdAt: Date | null;
    /** 리뷰가 작성된 가게 정보 */
    store: {
      /** 가게 ID */
      storeId: number;
      /** 가게 이름 */
      name: string;
    };
    /** 리뷰 이미지 목록 */
    images: {
      /** 리뷰 이미지 ID */
      imageId: number;
      /** 리뷰 이미지 URL */
      imageUrl: string;
    }[];
  }[];
  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 페이지 조회에 사용할 커서 */
    cursor: number | null;
  };
}
