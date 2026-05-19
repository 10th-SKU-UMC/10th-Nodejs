export interface CreateStoreRequest {
  category_id: number;
  name: string;
  address: string;
  status: string;
}

export interface StoreCreateResponse {
  store_id: number;
  name: string;
  address: string;
  status: string;
  created_at: Date;
}