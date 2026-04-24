export interface CreateStoreRequest {   //클라이언트에게 보냄
  name: string;
  region: string;
  address: string;
  category: string;
}

export interface CreateStoreResponse {  //돌려줄 값
  id: number;
  name: string;
  region: string;
  address: string;
  category: string;
}