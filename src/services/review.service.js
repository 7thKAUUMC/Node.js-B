import { doesStoreExist, addReview } from "../repositories/review.repository.js";
import { DuplicateStoreReviewError, DuplicateReviewError } from "../errors.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const createReview = async (data) => {
    const storeExists = await doesStoreExist(data.storeId); 
  
    if (!storeExists) {
      throw new DuplicateStoreReviewError("???? ?? ?????.", data);
    }
  
    const reviewId = await addReview({
      storeId: data.storeId,
      userId: data.userId,
      regionId: data.regionId,
      body: data.body || "",
      score: data.score
    });
  
    if (!reviewId) {
      throw new DuplicateReviewError("?? ??? ??????.", data);
    }
  
    return responseFromReview({ id: reviewId, ...data }); 
  };