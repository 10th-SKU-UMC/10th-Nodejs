// 리뷰 작성 요청 구조
export interface ReviewCreateRequest {
  userId: number;
  body: string;
  score: number;
}

// 리뷰 응답 데이터 포맷팅
export const responseFromReview = (data: any) => {
  return {
    reviewId: data.id,
    userId: data.user_id,
    restaurantId: data.restaurant_id,
    content: data.body,
    score: data.score,
    createdAt: data.created_at,
  };
};
