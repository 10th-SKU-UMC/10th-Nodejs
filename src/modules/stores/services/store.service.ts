import {
  CreateStoreRequest,
  StoreCreateResponse,
} from "../dtos/store.dto.js";
import { addStore } from "../repositories/store.repository.js";

export const createStore = async (
  regionId: number,
  data: CreateStoreRequest
): Promise<StoreCreateResponse> => {
  const store = await addStore({
    regionId,
    name: data.name,
    address: data.address,
    status: data.status
  });

  return <StoreCreateResponse>{
    store_id: store.id,
    name: store.name,
    address: store.address,
    status: store.status,
    created_at: store.createdAt,
  };
};
