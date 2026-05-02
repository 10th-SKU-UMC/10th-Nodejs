import { addStoreRepository } from "../repositories/store.repository.js";

export const addStoreService = async (regionId: number, data: any) => {
    const insertId = await addStoreRepository(regionId, data);
    return insertId;
};