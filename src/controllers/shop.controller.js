import { registerShop, registerReview, addShopMission} from "../services/shop.service.js";
import { beginMission } from "../services/user.service.js";
import { getShopMissions } from "../services/shop.service.js";


export const handleRegisterShop = async (req, res, next) => {
    try{
      const result = await registerShop(req.body);
      res.status(201).success({
          status: "success",
          message: result.message,
          data: { storeId: result.storeId }
      });
    }catch(error){
      res.status(error.status || 500).error(error)
    }
};


export const handleRegisterReview = async (req, res, next) => {
  try {
      const shopId = req.params.shopId;
      const result = await registerReview(req.body, shopId);
      res.status(201).success({
          status: "success",
          message: result.message
      });
  } catch (error) {
      res.status(error.status ||  500).error(error);
  }
};
export const handleAddShopMission = async (req, res, next) => {
  try {
      const shopId = req.params.shopId;
      const result = await addShopMission(req.body, shopId);
      res.status(201).success({
          status: "success",
          message: result.message
      });
  } catch (error) {
    res.status(error.status ||  500).error(error);
  }
};


export const handleGetMissionList = async (req, res, next) => {
  try {
      const shopId = Number(req.params.shopId);
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;

      const result = await getShopMissions({ shopId, page, pageSize });
      res.status(200).success({
          status: "success",
          message: "Missions retrieved successfully",
          data: result
      });
  } catch (error) {
    res.status(error.status ||  500).error(error);
  }
};