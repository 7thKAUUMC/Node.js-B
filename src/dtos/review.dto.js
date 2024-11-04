export const bodyToReview = (body) => {
  return {
    user_id: body.user_id,
    store_id: body.store_id,
    body: body.body,
    score: body.score,
  };
};

export const responseFromReview = (review, storeName) => {
  if (!review) {
    throw new Error("리뷰 정보가 없습니다.");
  }

  return {
    id: review.id,
    user: {
      id: review.user_id,
    },
    store: {
      id: review.store_id,
      name: storeName,
    },
    body: review.body,
    score: review.score,
    created_at: review.created_at,
  };
};

// 사용자 리뷰 응답 포맷팅 함수
export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
