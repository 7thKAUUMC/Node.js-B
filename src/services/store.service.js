import { addStore, getRegionNameById } from "../repositories/store.repository.js"; // 레포지토리 호출

export const createStore = async (storeData) => {
  const store = await addStore(storeData);
  return store; // 생성된 가게 반환
};

// 지역 이름 조회 함수
export const fetchRegionName = async (region_id) => {
  return await getRegionNameById(region_id);
};
