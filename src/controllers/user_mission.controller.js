import { StatusCodes } from "http-status-codes";
import { bodyToUserMission, responseFromUserMission } from "../dtos/user_mission.dto.js";
import { createUserMission } from "../services/user_mission.service.js"; // 서비스 호출

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
