//클라이언트에게 보내는 데이터
export interface CreateReviewRequest {
    user_id: number; //어떤 유저가 작성했는지
    store_id: number;    //어떤 가게
    score: number;  //별점(1~5)
    content: string;    //리뷰 내용
}
//서버가 돌려주는 데이터
export interface CreateReviewResponse {
    id: number; 
    user_id: number;
    store_id: number;
    score: number;
    content: string;
}