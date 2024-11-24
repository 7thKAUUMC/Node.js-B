import { addStore, getRegionNameById, getMissionsByStoreId } from "../repositories/store.repository.js"; // 레포지토리 호출
import { responseFromMissions } from "../dtos/store.dto.js"; // DTO 호출

export const createStore = async (storeData) => {
  return await addStore(storeData); // 가게 추가
};

export const fetchRegionName = async (regionId) => {
  return await getRegionNameById(regionId); // 지역 이름 조회
};

export const fetchMissionsByStoreId = async (storeId, cursor) => {
  const missions = await getMissionsByStoreId(storeId, cursor); // 커서 전달
  return responseFromMissions(missions); // DTO로 포맷팅된 미션 반환
};
