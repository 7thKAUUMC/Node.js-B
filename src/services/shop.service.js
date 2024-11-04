import { missionDto, registerShopDto, reviewDto} from "../dtos/shop.dto.js";
import { addShop, addReview, addMission } from "../repositories/shop.repository.js";
import { getShopMissionList } from "../repositories/shop.repository.js";

export const registerShop = async (data) => {

  const parsedData = registerShopDto(data);

  const register = await addShop(parsedData);

  return {
    storeId: register.storeId,
    message: register.message,
    status: register.status
  };
}


export const registerReview = async (data, shopId) => {
  const parsedData = reviewDto(data, parseInt(shopId,10));
  const register = await addReview(parsedData);

  return{
    message: register.message,
    status: register.status
  };
}

export const addShopMission = async (data, shopId)=> {
  const parsedData = missionDto(data, parseInt(shopId,10));
  const result = await addMission(parsedData);

  return{
    message: result.message,
    status: result.status
  }
}

export const getShopMissions = async (data) => {
  try {
    const { totalCount, missions } = await getShopMissionList(data);

    const formattedMissions = missions.map(mission => ({
      id: Number(mission.id.toString()),
      shopId: Number(mission.store_id.toString()),
      reward: mission.reward,
      deadline: mission.deadline,
      missionSpec: mission.mission_spec,
      createdAt: mission.created_at
    }));

    return {
      currentPage: data.page,
      totalPages: Math.ceil(totalCount / data.pageSize),
      totalItemCount: totalCount,
      data: formattedMissions
    };

  } catch (error) {
    const errorMessage = error.message || "Internal Server Error";
    const errorResponse = new Error(errorMessage);
    errorResponse.status = 500;
    throw errorResponse;
  }
};