export interface CreateStoreRequest {
  /** 카테고리 ID */
  category_id: number;
  /** 가게 이름 */
  name: string;
  /** 가게 주소 */
  address: string;
  /** 가게 상태 */
  status: string;
}

export interface StoreCreateResponse {
  /** 가게 ID */
  store_id: number;
  /** 가게 이름 */
  name: string;
  /** 가게 주소 */
  address: string;
  /** 가게 상태 */
  status: string;
  /** 가게 생성일 */
  created_at: Date;
}
