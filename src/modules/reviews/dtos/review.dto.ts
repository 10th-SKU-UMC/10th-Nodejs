// 클라이언트가 보내는 데이터 (user_id는 JWT 토큰에서 추출 → body에서 받지 않음)
export interface CreateReviewBody {
    store_id: number;   // 어떤 가게
    score: number;      // 별점 (1~5)
    content: string;    // 리뷰 내용
}

// 서비스/레포지토리 내부에서 사용하는 타입 (user_id 포함)
export interface CreateReviewRequest {
    user_id: number;    // JWT에서 추출한 로그인 유저 ID
    store_id: number;
    score: number;
    content: string;
}

// 서버가 돌려주는 데이터
export interface CreateReviewResponse {
    id: number;
    user_id: number;
    store_id: number;
    score: number;
    content: string;
}