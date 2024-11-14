import { registerShop, registerReview, addShopMission} from "../services/shop.service.js";
import { beginMission } from "../services/user.service.js";
import { getShopMissions } from "../services/shop.service.js";


export const handleRegisterShop = async (req, res, next) => {
  /*
  #swagger.summary = '가게 등록 API'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "test" },
            address: { type: "string", example: "test" },
            region: { type: "integer", example: 1 }
          },
          required: ["name", "address", "region"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "가게 등록 성공",
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
                status: { type: "string", example: "success" },
                message: { type: "string", example: "성공적으로 등록되었습니다." },
                data: {
                  type: "object",
                  properties: {
                    storeId: { type: "integer", example: 14 }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "서버 오류 - 가게 등록 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              nullable: false,
              properties: {
                message: { type: "string", example: "서버 오류가 발생했습니다." }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

    try{

      const result = await registerShop(req.body);
      res.status(201).success({
          status: "success",
          message: result.message,
          data: { storeId: result.storeId }
      });
    }catch(error){
      res.status(error.status || 500).error(error)
    }
};


export const handleRegisterReview = async (req, res, next) => {
/*
  #swagger.summary = '리뷰 등록 API'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            userId: { type: "integer", example: 1 },
            stars: { type: "integer", example: 5, description: "리뷰 점수 (1~5)" },
            content: { type: "string", example: "content" }
          },
          required: ["userId", "stars", "content"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "리뷰 등록 성공",
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
                status: { type: "string", example: "success" },
                message: { type: "string", example: "성공적으로 리뷰를 등록했습니다." }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "서버 오류 - 리뷰 등록 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              nullable: false,
              properties: {
                message: { type: "string", example: "서버 오류가 발생했습니다." }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

  try {
      const shopId = req.params.shopId;
      const result = await registerReview(req.body, shopId);
      res.status(201).success({
          status: "success",
          message: result.message
      });
  } catch (error) {
      res.status(error.status ||  500).error(error);
  }
};


export const handleAddShopMission = async (req, res, next) => {

  /*
  #swagger.summary = '미션 등록 API'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            reward: { type: "integer", example: 1000, description: "미션 보상 금액" },
            deadline: { type: "string", format: "date", example: "2022-01-01", description: "미션 마감일" },
            mission_spec: { type: "string", example: "test spec", description: "미션 상세 설명" }
          },
          required: ["reward", "deadline", "mission_spec"]
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "미션 등록 성공",
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
                status: { type: "string", example: "success" },
                message: { type: "string", example: "성공적으로 미션을 등록했습니다." }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "서버 오류 - 미션 등록 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              nullable: false,
              properties: {
                message: { type: "string", example: "서버 오류가 발생했습니다." }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

  try {
      const shopId = req.params.shopId;
      const result = await addShopMission(req.body, shopId);
      res.status(200).success({
          status: "success",
          message: result.message
      });
  } catch (error) {
    res.status(error.status ||  500).error(error);
  }
};


export const handleGetMissionList = async (req, res, next) => {
  /*
  #swagger.summary = '미션 목록 조회 API'
  #swagger.parameters['page'] = {
    in: 'query',
    description: '현재 페이지 번호',
    required: false,
    type: 'integer',
    example: 1
  }
  #swagger.parameters['pageSize'] = {
    in: 'query',
    description: '페이지당 항목 수',
    required: false,
    type: 'integer',
    example: 10
  }
  #swagger.responses[200] = {
    description: "미션 목록 조회 성공",
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
                status: { type: "string", example: "success" },
                message: { type: "string", example: "Missions retrieved successfully" },
                data: {
                  type: "object",
                  properties: {
                    currentPage: { type: "integer", example: 1 },
                    totalPages: { type: "integer", example: 1 },
                    totalItemCount: { type: "integer", example: 3 },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          shopId: { type: "integer", example: 1 },
                          reward: { type: "integer", example: 1000 },
                          deadline: { type: "string", format: "date-time", example: "2024-12-25T00:00:00.000Z" },
                          missionSpec: { type: "string", example: "매장에서 5만원 이상 구매하고 리뷰 작성하기" },
                          createdAt: { type: "string", format: "date-time", nullable: true, example: null }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "서버 오류 - 미션 목록 조회 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              nullable: false,
              properties: {
                message: { type: "string", example: "서버 오류가 발생했습니다." }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

  try {
      const shopId = Number(req.params.shopId);
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;

      const result = await getShopMissions({ shopId, page, pageSize });
      res.status(200).success({
          status: "success",
          message: "Missions retrieved successfully",
          data: result
      });
  } catch (error) {
    res.status(error.status ||  500).error(error);
  }
};