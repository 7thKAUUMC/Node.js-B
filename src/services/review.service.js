import { doesStoreExist, addReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const createReview = async (data) => {
    const storeExists = await doesStoreExist(data.storeId); 
  
    if (!storeExists) {
      throw new Error("??? ???? ????.");
    }
  
    const reviewId = await addReview({
      storeId: data.storeId,
      userId: data.userId,
      regionId: data.regionId,
      body: data.body || "",
      score: data.score
    });
  
    if (!reviewId) {
      throw new Error("?? ??? ??????.");
    }
  
    return responseFromReview({ id: reviewId, ...data }); 
  };