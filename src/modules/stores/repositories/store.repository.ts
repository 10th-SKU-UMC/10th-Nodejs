import { prisma } from "../../../db.config.js";

export const storeRepository = {
  async createStore(data: any) {
    const store = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        region: data.region,   
        category: data.category,
      },
    });
    return store.id;
  },

  async findStoreById(storeId: number) {
    return await prisma.store.findFirst({
      where: {id: storeId },
    });
  },
};

export const getAllStoreReviews = async (storeId: number, cursor: number) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: {
      storeId,
      ...(cursor > 0 && { id: {gt: cursor } }),
    },
    orderBy: { id: "asc"},
    take: 5,
  });

  return reviews;
};