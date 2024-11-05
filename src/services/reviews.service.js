import { addReview, getReviewsByStoreId, getUserReviews } from "../repositories/review.repository.js";
import { doesStoreExist } from "../repositories/store.repository.js"; // ??
import { responseFromReview } from "../dtos/review.dto.js";

// ?? ??
export const createReview = async (data) => {
  const storeExists = await doesStoreExist(data.storeId); // ??

  if (!storeExists) {
    throw new Error("??? ????? ??? ???? ????.");
  }

  const reviewId = await addReview({
    storeId: data.storeId,
    userId: data.userId,
    contents: data.contents || "",
    score: data.score,
    day: data.day,
    image: data.image || ""
  });

  if (!reviewId) {
    throw new Error("?? ??? ??????.");
  }

  return responseFromReview({ id: reviewId, ...data }); // DTO ???? ??
};

// ?? ??? ?? ??
export const getStoreReviews = async (storeId) => {
  const reviews = await getReviewsByStoreId(storeId);

  return reviews.map(responseFromReview); // DTO ???? ???? ??
};

// ?? ???? ?? ??
export const getUserReviewList = async (userId) => {
  const reviews = await getUserReviews(userId);

  return reviews.map(responseFromReview); // DTO ???? ???? ??
};
