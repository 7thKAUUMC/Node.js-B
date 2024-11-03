import { addUserMission, checkUserMissionExists } from "../repositories/user_mission.repository.js";

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
