import { addReview, getStoreById } from "../repositories/review.repository.js";

export const createReview = async (reviewData) => {
  // 가게 존재 여부 확인
  const store = await getStoreById(reviewData.store_id);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 리뷰 추가 (가게의 region_id 사용)
  const reviewWithRegionId = {
    user_id: reviewData.user_id,
    store_id: reviewData.store_id,
    region_id: store.region_id, // 가게의 region_id 사용
    body: reviewData.body,
    score: reviewData.score,
  };

  const review = await addReview(reviewWithRegionId);
  return { review, storeName: store.name }; 
};
