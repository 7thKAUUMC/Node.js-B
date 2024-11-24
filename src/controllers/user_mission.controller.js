import { StatusCodes } from "http-status-codes";
import { bodyToUserMission, responseFromUserMission, responseFromUserMissions } from "../dtos/user_mission.dto.js";
import { createUserMission, listUserMissions } from "../services/user_mission.service.js";

// 현재 진행 중인 미션 추가 핸들러
export const handleAddUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 미션 추가 API';
    #swagger.description = '사용자가 새로운 미션을 추가할 수 있는 API입니다.';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number", example: 1 },
              mission_id: { type: "number", example: 101 },
              store_id: { type: "number", example: 202 },
              region_id: { type: "number", example: 303 }
            },
            required: ["user_id", "mission_id", "store_id", "region_id"] // 필수 필드 지정
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: false },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  user_id: { type: "number" },
                  mission_id: { type: "number" },
                  store_id: { type: "number" },
                  region_id: { type: "number" },
                  status: { type: "string", example: "진행중" },
                  created_at: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM001" },
                  reason: { type: "string" },
                  data: { type: "string", example: "{ data }" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

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
  /*
    #swagger.summary = '사용자가 진행 중인 미션 조회 API';
    #swagger.description = '사용자가 현재 진행 중인 미션을 조회할 수 있는 API입니다.';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자의 ID',
      required: true,
      type: 'integer',
      example: 1 // 사용자 ID의 예시
    };
    #swagger.responses[200] = {
      description: "사용자의 미션 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: false },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        user_id: { type: "number" },
                        mission_id: { type: "number" },
                        store_id: { type: "number" },
                        region_id: { type: "number" },
                        status: { type: "string", example: "진행중" },
                        created_at: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "사용자를 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM002" },
                  reason: { type: "string" },
                  data: { type: "string", example: "{ data }" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

  const userId = parseInt(req.params.userId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  try {
    const missions = await listUserMissions(userId, cursor);
    return res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error); 
  }
};
