import { prisma } from "../db.config.js";

// 리뷰 추가 함수
export const addReview = async (data) => {
  try {
    const review = await prisma.review.create({
      data: {
        user_id: data.user_id,
        store_id: data.store_id,
        body: data.body,
        score: data.score,
        region_id: data.region_id, 
      },
    });

    return review; // 생성된 리뷰 반환
  } catch (err) {
    console.error("리뷰 추가 중 오류 발생:", err);
    throw new Error("리뷰 추가에 실패했습니다."); // 예외 발생
  }
};

// 가게 조회 함수
export const getStoreById = async (storeId) => {
  return await prisma.store.findUnique({
    where: { id: storeId },
    select: { id: true, name: true, region_id: true }, // 필요한 필드만 선택
  });
};

// 사용자 리뷰 조회 함수
export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      score: true,
      created_at: true,
      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      user_id: userId,
      id: {
        gt: cursor, // cursor 값보다 큰 id만 조회
      },
    },
    orderBy: {
      id: "asc", // id 기준으로 오름차순 정렬
    },
    take: 5, // 최대 5개 리뷰 조회
  });

  return reviews;
};
