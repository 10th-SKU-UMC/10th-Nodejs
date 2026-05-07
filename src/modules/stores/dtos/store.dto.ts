export interface CreateStoreRequest {   //클라이언트에게 보냄
  name: string;
  region: string;
  address: string;
  category: string;
}

export interface CreateStoreResponse {  //돌려줄 값
  id: number;
  name: string;
  region: string;
  address: string;
  category: string;
}

export interface ReviewItem {
  id: number;
  content: string;
  storeId: number;
  userId: number;
  store: any;
  user: any;
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