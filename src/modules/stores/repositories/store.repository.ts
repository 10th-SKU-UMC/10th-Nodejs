import { prisma } from "../../../db.config.js";
import { StoreStatus } from "../../../generated/prisma/enums.js";

export const addStore = async (data: any): Promise<number> => {
  try {
    const store = await prisma.store.create({
      data: {
        regionId: data.regionId,
        name: data.name,
        address: data.address,
        status: data.status as StoreStatus | undefined,
      },
    });

    return store.id;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

export const getStoreById = async (storeId: number): Promise<any | null> => {
  try {
    return await prisma.store.findUnique({
      where: { id: storeId },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};
