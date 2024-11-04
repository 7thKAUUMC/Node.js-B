import { prisma } from "../db.config.js";

//가게 추가 함수
export const addStore = async (data) => {
  try {
    const store = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        region_id: data.region_id,
      },
    });

    return store; // 생성된 가게 반환
  } catch (err) {
    console.error("가게 추가 중 오류 발생:", err);
    throw new Error("가게 추가에 실패했습니다."); // 예외 발생
  }
};

//주어진 region_id에 해당하는 지역의 이름을 조회하는 함수
export const getRegionNameById = async (regionId) => {
  const region = await prisma.region.findUnique({
    where: { id: regionId },
    select: { name: true },
  });
  return region ? region.name : null; 
};



// 가게 ID에 해당하는 미션 조회 함수 (커서 기반)
export const getMissionsByStoreId = async (storeId, cursor) => {
  return await prisma.mission.findMany({
    where: { store_id: storeId },
    take: 10, 
    skip: cursor > 0 ? 1 : 0, // 커서가 0보다 클 경우 첫 번째 항목을 건너뛰기
    orderBy: { id: "asc" } // ID 기준으로 오름차순 정렬
  });
};
