import { registerShop, registerReview, addShopMission} from "../services/shop.service.js";
import { beginMission } from "../services/user.service.js";
import { getShopMissions } from "../services/shop.service.js";
export const handleRegisterShop = async (req, res) => {
  try{
    const result = await registerShop(req.body);
    return res.status(result.status).json({message : result.message, storeId: result.storeId});
  }catch(error){
    return res.status(error.status || 500).json({message: error.message});
  }
} 


export const handleRegisterReview = async (req, res) => {
  try{
    const shopId = req.params.shopId;
    const result = await registerReview(req.body, shopId);
    return res.status(result.status).json({message : result.message});
  }catch (error) {

    return res.status(error.status || 500).json({message: error.message});
  }
}


export const handleAddShopMission = async (req, res) => {
  try{
    const shopId = req.params.shopId;
    const result = await addShopMission(req.body, shopId);

    return res.status(result.status).json({message: result.message});
  }catch(error){
    return res.status(error.status || 500).json({message: error.message});
  }
}

export const handleGetMissionList = async (req, res) => {
  try {
    const shopId = Number(req.params.shopId);
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const result = await getShopMissions({
      shopId,
      page,
      pageSize
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Internal Server Error"
    });
  }
}