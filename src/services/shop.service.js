import { missionDto, registerShopDto, reviewDto} from "../dtos/shop.dto.js";
import { InternalServerError, ShopError } from "../errors.js";
import { addShop, addReview, addMission } from "../repositories/shop.repository.js";
import { getShopMissionList } from "../repositories/shop.repository.js";

export const registerShop = async (data) => {
  try {
      const parsedData = registerShopDto(data);


      const register = await addShop(parsedData);


      if (!register || register.status !== 201 || !parsedData.name) {
          throw new ShopError("Failed to register shop. Please check the input data or database connection.");
      }

      return {
          storeId: register.storeId,
          message: register.message,
          status: register.status,
      };
  } catch (error) {
      throw error; 
  }
};

export const registerReview = async (data, shopId) => {
  const parsedData = reviewDto(data, parseInt(shopId, 10));
  const register = await addReview(parsedData);

  if (!register || register.status !== 201) {
      throw new ShopError("Failed to register review");
  }

  return {
      message: register.message,
      status: register.status
  };
};

export const addShopMission = async (data, shopId) => {
  const parsedData = missionDto(data, parseInt(shopId, 10));
  const result = await addMission(parsedData);

  if (!result || result.status !== 201) {
      throw new ShopError("Failed to add mission");
  }

  return {
      message: result.message,
      status: result.status
  };
};

export const getShopMissions = async (data) => {
  const { totalCount, missions } = await getShopMissionList(data);

  if (!missions) {
      throw new InternalServerError("Failed to fetch missions");
  }

  const formattedMissions = missions.map((mission) => ({
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
};