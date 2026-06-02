import { Controller, Route, Tags, Post, Get, Body, Path, Query, Response, Request, Security, SuccessResponse} from "tsoa";
import { addReviewService, addStoreService, listStoreReviews } from "../services/store.service";
import { addStoreRequest, addReviewRequest, ReviewListResponse, ApiErrorResponse, ApiSuccessResponse } from '../dtos/store.dto';


@Route("stores")
@Tags("가게")
export class StoreController extends Controller {
    
    // 1-1. 지역에 가게 추가하기
    @Security("jwt")
    @Post("regions/{regionId}")
    @SuccessResponse("200", "가게 추가 완료")
    @Response<ApiErrorResponse>("400", "가게추가실패: 필수값 누락")
    @Response<ApiErrorResponse>("404", "가게추가실패: 존재하지않는지역")
    public async addStore(
        @Path() regionId: number,
        @Request() req: any,
        @Body() storeData: addStoreRequest
    ): Promise<ApiSuccessResponse> {
        console.log("==특정 지역 가게 추가 요청==");
        console.log("요청 지역 번호 :", regionId);
        console.log("요청 가게 데이터 :", storeData);
        const userId = req.user.id;
        const newStoreId = await addStoreService(userId, regionId, storeData);
        return {
            resultType: "SUCCESS",
            data: {storeId: newStoreId}
        };
    }

    // 1-2. 가게에 리뷰 추가하기
    @Security("jwt")
    @Post("{storeId}/reviews")
    @SuccessResponse("200", "가게 추가 성공")
    @Response<ApiErrorResponse>("400", "리뷰추가실패: 잘못된값")
    @Response<ApiErrorResponse>("404", "리뷰추가실패: 존재하지 않는 가게")
    public async addReviews(
        @Path() storeId: number,
        @Request() req: any,
        @Body() reviewData: addReviewRequest
    ): Promise<ApiSuccessResponse> {
        console.log("===가게에 리뷰 추가 요청==");
        console.log("요청 가게 번호 :", storeId);

        const userId = req.user.id;
        const newReviewId = await addReviewService(userId, storeId, reviewData);
        
        return {
            resultType: "SUCCESS",
            data: {storeId: storeId}
        };
    }

    // 목록조회
    @Get("{storeId}/reviews")
    @SuccessResponse("200", "리뷰목록조회성공")
    @Response<ApiErrorResponse>("404", "리뷰조회실패: 존재하지 않는 가게")
    public async handleListStoreReviews(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<any> {
        const reviews = await listStoreReviews(storeId, cursor || 0);
        return { data: [], pagination: { cursor: null } };
    }
}