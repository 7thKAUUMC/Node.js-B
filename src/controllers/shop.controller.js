import { registerShop, registerReview, addShopMission, beginMission } from "../services/shop.service.js";

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

export const handleStartMission = async(req, res) => {
  try{
    const { userId, missionId } = req.params;
    const result = await beginMission(userId, missionId);

    return res.status(result.status).json({message: result.message});
  }catch(error){
    return res.status(error.status || 500).json({message: error.message});
  }
}