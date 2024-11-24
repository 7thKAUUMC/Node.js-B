import { StatusCodes } from "http-status-codes";
import { bodyToUserMission, responseFromUserMission, responseFromUserMissions } from "../dtos/user_mission.dto.js";
import { createUserMission, listUserMissions } from "../services/user_mission.service.js";

// 현재 진행 중인 미션 추가 핸들러
export const handleAddUserMission = async (req, res, next) => {
  console.log("미션 추가 요청이 들어왔습니다!");
  console.log("body:", req.body);

  const missionData = bodyToUserMission(req.body);

  try {
    const memberMission = await createUserMission(missionData);
    const response = responseFromUserMission(memberMission);
    return res.status(StatusCodes.CREATED).success(response);
  } catch (error) {
    next(error); 
  }
};

// 현재 진행 중인 미션 조회 핸들러
export const handleListUserMissions = async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  try {
    const missions = await listUserMissions(userId, cursor);
    return res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error); 
  }
};
