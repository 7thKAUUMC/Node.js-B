import { addUserMission, checkUserMissionExists, getUserMissions } from "../repositories/user_mission.repository.js"; // 레포지토리 호출
import { responseFromUserMissions } from "../dtos/user_mission.dto.js"; // DTO 임포트

export const createUserMission = async (missionData) => {
  // 미션 중복 여부 확인
  const exists = await checkUserMissionExists(missionData.mission_id, missionData.user_id);
  if (exists) {
    throw new Error("이미 진행 중인 미션입니다."); // 이미 진행 중인 경우 예외 발생
  }

  // 미션 추가
  const memberMission = await addUserMission(missionData);
  return memberMission;
};

// 현재 진행 중인 미션 목록 조회
export const listUserMissions = async (userId, cursor) => {
  const missions = await getUserMissions(userId, cursor);
  return responseFromUserMissions(missions); // DTO로 포맷팅된 미션 반환
};
