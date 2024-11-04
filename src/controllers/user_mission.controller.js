import { StatusCodes } from "http-status-codes";
import { bodyToUserMission, responseFromUserMission, responseFromUserMissions } from "../dtos/user_mission.dto.js";
import { createUserMission, listUserMissions } from "../services/user_mission.service.js"; // 서비스 호출

export const handleAddUserMission = async (req, res) => {
  console.log("미션 추가 요청이 들어왔습니다!");
  console.log("body:", req.body); // 요청 본문 확인

  const missionData = bodyToUserMission(req.body);

  try {
    const memberMission = await createUserMission(missionData);
    const response = responseFromUserMission(memberMission);
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    console.error("오류 발생:", error); // 오류 로그 추가
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

// 현재 진행 중인 미션 조회 핸들러
export const handleListUserMissions = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  try {
    const missions = await listUserMissions(userId, cursor);
    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    console.error("오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
