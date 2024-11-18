import { StatusCodes } from "http-status-codes";
import { createMission, missionChallenge } from "../services/missioin.service.js";
import { bodyToMission, bodyToChallengeMission } from "../dtos/mission.dto.js";

export const handleAddMission = async (req, res) => {
    /*
    #swagger.summary = '미션 추가하기 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              regionId: { type: "number" },
              reward: { type: "number" },
              deadline: { type: "string", format: "date-time" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nummable: true, example: null },
              success: {
                type: "object",
                properties: {
                  storeId: { type: "number" },
                  regionId: { type: "number" },
                  reward: { type: "number" },
                  deadline: { type: "string", format: "date-time" },
                  mission_spec: { type: "string" },
                  createdAt: { type: "string", format: "date-time" }
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
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */
    console.log("request to add mission");
    console.log("body:", req.body);

    const mission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: mission });
};

export const handleChallengeMission = async (req, res) => {
    /*
    #swagger.summary = '진행 중인 미션에 추가하기 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missionId: { type: "number" },
              userId: { type: "number" },
              storeId: { type: "number" },
              regionId: { type: "number" },
              status: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "진행 중인 미션에 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nummable: true, example: null },
              success: {
                type: "object",
                properties: {
                  missionId: { type: "number" },
                  userId: { type: "number" },
                  storeId: { type: "number" },
                  regionId: { type: "number" },
                  status: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "진행 중인 미션에 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "C001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */
    console.log("request to add challengemission");
    console.log("body:", req.body);

    const missionData = await missionChallenge(bodyToChallengeMission(req.body));
    res.status(StatusCodes.OK).json({ result: missionData });
}