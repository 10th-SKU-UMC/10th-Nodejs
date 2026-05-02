//1-1. 특정 지역에 가게 추가하기
export interface addStoreRequest{
  name: string; //가게명
  address: string; //가게주소
  addressDeatil : string; //가게상세주소
  phoneNum : string; //가게전화번호
}