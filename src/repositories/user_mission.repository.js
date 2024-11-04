import { prisma } from "../db.config.js";

// 미션 추가 함수
export const addUserMission = async (data) => {
  try {
    const memberMission = await prisma.memberMission.create({
      data: {
        mission_id: data.mission_id,
        user_id: data.user_id,
        store_id: data.store_id,
        region_id: data.region_id,
        status: '진행중', // 기본 상태
      },
    });

    return memberMission; // 생성된 미션 반환
  } catch (err) {
    console.error("미션 추가 중 오류 발생:", err);
    throw new Error("미션 추가에 실패했습니다."); // 예외 발생
  }
};

// 사용자 미션 존재 여부 확인 함수
export const checkUserMissionExists = async (missionId, userId) => {
  try {
    const existingMission = await prisma.memberMission.findFirst({
      where: {
        mission_id: missionId,
        user_id: userId,
      },
    });
    return existingMission !== null; // 미션이 존재하면 true 반환
  } catch (err) {
    console.error("미션 체크 중 오류 발생:", err);
    return false; // 오류 발생 시 false 반환
  }
};

// 현재 진행 중인 미션 조회 함수
export const getUserMissions = async (userId, cursor) => {
  return await prisma.memberMission.findMany({
    where: { user_id: userId, status: "진행중", id: { gt: cursor } }, // status가 "잔행중"인지 확인
    orderBy: { id: "asc" },
    take: 5,
  });
};
