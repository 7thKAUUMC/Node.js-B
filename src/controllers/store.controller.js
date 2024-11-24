import { StatusCodes } from "http-status-codes";
import { bodyToStore, responseFromStore } from "../dtos/store.dto.js";
import { createStore, fetchRegionName, fetchMissionsByStoreId } from "../services/store.service.js"; // 서비스 호출

export const handleAddStore = async (req, res, next) => {
  console.log("가게 추가 요청이 들어왔습니다!");
  console.log("body:", req.body); 

  const storeData = bodyToStore(req.body);

  try {
    const store = await createStore(storeData);
    const regionName = await fetchRegionName(storeData.region_id);
    const response = responseFromStore(store, regionName);
    return res.status(StatusCodes.CREATED).success(response);
  } catch (error) {
    next(error); 
  }
};

// 특정 가게의 미션 조회 핸들러
export const handleListStoreMissions = async (req, res, next) => {
  const storeId = parseInt(req.params.storeId);

  try {
    const missions = await fetchMissionsByStoreId(storeId);
    return res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error); 
  }
};
