import { StatusCodes } from "http-status-codes";
import { bodyToStore, responseFromStore } from "../dtos/store.dto.js";
import { createStore, fetchRegionName, fetchMissionsByStoreId } from "../services/store.service.js"; // 서비스 호출

export const handleAddStore = async (req, res, next) => {
  /*
    #swagger.summary = '가게 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              address: { type: "string" },
              region_id: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  address: { type: "string" },
                  region_id: { type: "number" },
                  region_name: { type: "string" },
                  created_at: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
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

  console.log("가게 추가 요청이 들어왔습니다!");
  console.log("body:", req.body); 

  const storeData = bodyToStore(req.body);

  try {
    const store = await createStore(storeData);
    const regionName = await fetchRegionName(storeData.region_id);
    const response = responseFromStore(store, regionName);
    return res.status(StatusCodes.CREATED).success(response);
  } catch (error) {
    next(error); 
  }
};

// 특정 가게의 미션 조회 핸들러
export const handleListStoreMissions = async (req, res, next) => {
   /*
    #swagger.summary = '특정 가게의 미션 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '가게의 ID',
      required: true,
      type: 'integer'
    };
    #swagger.responses[200] = {
      description: "가게의 미션 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    store_id: { type: "number" },
                    region_id: { type: "number" },
                    reward: { type: "string" },
                    deadline: { type: "string", format: "date-time" },
                    mission_spec: { type: "string" },
                    created_at: { type: "string", format: "date-time" }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "가게를 찾을 수 없음",
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

  const storeId = parseInt(req.params.storeId);

  try {
    const missions = await fetchMissionsByStoreId(storeId);
    return res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error); 
  }
};
