import { missionDto, registerShopDto, reviewDto, startMissionDto } from "../dtos/shop.dto.js";
import { addShop, addReview, addMission, addToUserMission } from "../repositories/shop.repository.js";

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

export const beginMission = async (userId, missionId) => {
  const parsedData = startMissionDto(parseInt(userId,10), parseInt(missionId,10));
  const result = await addToUserMission(parsedData);

  return{
    message: result.message,
    status: result.status
  }
}