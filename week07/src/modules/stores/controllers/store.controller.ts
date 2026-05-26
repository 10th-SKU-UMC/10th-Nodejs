import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
import { addReviewService, addStoreService, listStoreReviews } from "../services/store.service";

@Route("stores")
@Tags("가게")
export class StoreController extends Controller {
    
    // 1-1. 지역에 가게 추가하기
    @Post("regions/{regionId}")
    public async addStore(
        @Path() regionId: number,
        @Body() storeData: any
    ): Promise<any> {
        console.log("==특정 지역 가게 추가 요청==");
        console.log("요청 지역 번호 :", regionId);
        console.log("요청 가게 데이터 :", storeData);

        const newStoreId = await addStoreService(regionId, storeData);

        return {
            isSuccess: true,
            message: `생성완료`,
            data: storeData
        };
    }

    // 1-2. 가게에 리뷰 추가하기
    @Post("{storeId}/reviews")
    public async addReviews(
        @Path() storeId: number,
        @Body() reviewData: any
    ): Promise<any> {
        console.log("===가게에 리뷰 추가 요청==");
        console.log("요청 가게 번호 :", storeId);
        
        const newReviewId = await addReviewService(storeId, reviewData);
        
        return {
            isSuccess: true,
            message: `생성완료`,
            data: reviewData
        };
    }

    // 목록조회
    @Get("{storeId}/reviews")
    public async handleListStoreReviews(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<any> {
        const reviews = await listStoreReviews(storeId, cursor || 0);
        return reviews;
    }
}