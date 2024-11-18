import { doesStoreExist, addReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const createReview = async (data) => {
    const storeExists = await doesStoreExist(data.storeId); 
  
    if (!storeExists) {
      throw new DuplicateStoreReviewError("error: Store doesn't exist!", data);
    }
  
    const reviewId = await addReview({
      storeId: data.storeId,
      userId: data.userId,
      regionId: data.regionId,
      body: data.body || "",
      score: data.score
    });
  
    if (!reviewId) {
      throw new DuplicateReviewError("error: You can't create review!", data);
    }
  
    return responseFromReview({ id: reviewId, ...data }); 
  };