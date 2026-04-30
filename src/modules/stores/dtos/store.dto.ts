export interface CreateStoreRequest {
  category_id: number;
  name: string;
  address: string;
  status: string;
}

export const bodyToStore = (body: CreateStoreRequest, regionId: number) => {
  return {
    regionId,
    categoryId: body.category_id,
    name: body.name,
    address: body.address,
    status: body.status,
  };
};

interface StoreResponseInput {
  storeId: number;
  createdAt: Date;
}

export const responseFromStore = ({ storeId, createdAt }: StoreResponseInput) => {
  return {
    store_id: storeId,
    created_at: createdAt,
  };
};
