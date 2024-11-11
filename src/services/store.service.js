import { addStore, getRegionNameById, getMissionsByStoreId } from "../repositories/store.repository.js"; // 레포지토리 호출
import { responseFromMissions } from "../dtos/store.dto.js"; // DTO 호출

export const createStore = async (storeData) => {
  try {
    const store = await addStore(storeData);
    return store; // 생성된 가게 반환
  } catch (error) {
    throw new Error(error.message); // 오류 메시지 전달
  }
};

// 지역 이름 조회 함수
export const fetchRegionName = async (region_id) => {
  return await getRegionNameById(region_id);
};

// 특정 가게의 미션 조회 함수
export const fetchMissionsByStoreId = async (storeId, cursor) => {
  const missions = await getMissionsByStoreId(storeId, cursor); // 커서 전달
  return responseFromMissions(missions); // DTO로 포맷팅된 미션 반환
};
