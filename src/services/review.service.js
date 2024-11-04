import { addReview, getStoreById, getAllUserReviews } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

export const createReview = async (reviewData) => {
  // 가게 존재 여부 확인
  const store = await getStoreById(reviewData.store_id);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 리뷰 추가
  const review = await addReview({
    user_id: reviewData.user_id,
    store_id: reviewData.store_id,
    body: reviewData.body,
    score: reviewData.score,
    region_id: store.region_id, 
  });

  return { review, storeName: store.name }; 
};

// 유저의 리뷰
export const listUserReviews = async (userId, cursor) => {
  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};
