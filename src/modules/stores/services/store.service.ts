import { responseFromStore } from "../dtos/store.dto.js";
import { addStore } from "../repositories/store.repository.js";

export const createStore = async (data: any) => {
  const storeId = await addStore(data);

  return responseFromStore({
    storeId,
    createdAt: new Date(),
  });
};
