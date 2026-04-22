import { storeRepository } from "../repositories/store.repository";
import { CreateStoreRequest } from "../dtos/store.dto";

export const storeService = {
  async createStore(data: CreateStoreRequest) {
    // 검증 추가
    if (!data.name || !data.region || !data.address || !data.category) {
      throw new Error("모든 항목을 입력해주세요.");
    }


    const storeId = await storeRepository.createStore(data);

    return {
      id: storeId,
      ...data,
    };
  },
};