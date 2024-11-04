import { StatusCodes } from "http-status-codes";
import { bodyToStore, responseFromStore, responseFromMissions } from "../dtos/store.dto.js";
import { createStore, fetchRegionName, fetchMissionsByStoreId } from "../services/store.service.js"; // 서비스 호출

export const handleAddStore = async (req, res) => {
  console.log("가게 추가 요청이 들어왔습니다!");
  console.log("body:", req.body); 

  const storeData = bodyToStore(req.body);

  try {
    const store = await createStore(storeData);
    
    // region_id에 해당하는 지역 이름 조회
    const regionName = await fetchRegionName(storeData.region_id);
    
    const response = responseFromStore(store, regionName);
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    console.error("오류 발생:", error); 
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

// 특정 가게의 미션 조회 핸들러
export const handleListStoreMissions = async (req, res) => {
  const storeId = parseInt(req.params.storeId);

  try {
    const missions = await fetchMissionsByStoreId(storeId); // 서비스에서 호출
    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    console.error("오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};