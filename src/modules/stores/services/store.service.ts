import { storeRepository, getAllStoreReviews } from "../repositories/store.repository";
import { CreateStoreRequest, ReviewListResponse, responseFromReviews } from "../dtos/store.dto";

export const storeService = {
  async createStore(data: CreateStoreRequest) {
    // 검증 추가
    if (!data.name || !data.region || !data.address || !data.category) {
      throw new Error("모든 항목을 입력해주세요.");
    }
    const storeId = await storeRepository.createStore(data);
    return {
      id: storeId,
      ...data
    };
  },
};

export const listStoreReviews = async (
  storeId: number,
  cursor: number 
): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};