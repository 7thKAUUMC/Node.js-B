import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { getUserReviews, userSignUp } from "../services/user.service.js";
import { beginMission, getOngoingMissions } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {

/*
  #swagger.summary = '사용자 등록 API'
  #swagger.responses[200] = {
    description: "사용자 등록 성공",
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
                email: { type: "string", example: "examle@gmail.com" },
                name: { type: "string", example: "test" },
                preferCategory: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      foodCategory: { type: "integer", example: 1 },
                      categoryName: { type: "string", example: "한식" }
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
*/

/*
  #swagger.summary = '사용자 등록 API'
  #swagger.responses[500] = {
    description: "서버 오류 - 사용자 등록 실패",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              nullable: true,
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                data: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "kevinheao0413@gmadil.com" },
                    name: { type: "string", example: "test" },
                    gender: { type: "string", example: "male" },
                    birth: { type: "string", format: "date-time", example: "1999-04-13T00:00:00.000Z" },
                    address: { type: "string", example: "test addr" },
                    detailAddress: { type: "string", example: "" },
                    preferences: {
                      type: "array",
                      items: { type: "integer", example: 1 }
                    }
                  }
                }
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
      const user = await userSignUp(bodyToUser(req.body));
      res.status(StatusCodes.OK).success(user);
    }catch(error){
      res.status(500).error(error);
    }
};


export const handleStartMission = async(req, res) => {
/*
  #swagger.summary = '미션 시작 API'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '사용자 ID',
    required: true,
    type: 'string',
    example: '123'
  }
  #swagger.parameters['missionId'] = {
    in: 'path',
    description: '미션 ID',
    required: true,
    type: 'string',
    example: '456'
  }
  #swagger.responses[200] = {
    description: "미션 시작 성공",
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
                message: { type: "string", example: "성공적으로 미션을 시작했습니다." },
                status: { type: "integer", example: 201 }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "서버 오류 - 미션 시작 실패",
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
      const { userId, missionId } = req.params;
      const result = await beginMission(userId, missionId);

      return res.status(StatusCodes.OK).success(result);
    }catch(error){
      res.status(500).error(error);
    }

}


export const handleGetUserReviews = async (req,res) => {
  /*
  #swagger.summary = '사용자 리뷰 조회 API'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '사용자 ID',
    required: true,
    type: 'integer',
    example: 123
  }
  #swagger.parameters['sortBy'] = {
    in: 'query',
    description: '정렬 기준 (예: latest)',
    required: false,
    type: 'string',
    example: 'latest'
  }
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
    description: "사용자 리뷰 조회 성공",
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
                currentPage: { type: "integer", example: 1 },
                totalPages: { type: "integer", example: 1 },
                totalItemCount: { type: "integer", example: 3 },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 3 },
                      shopId: { type: "integer", example: 1 },
                      score: { type: "integer", example: 4 },
                      content: { type: "string", example: "testContent" },
                      createdAt: { type: "string", format: "date-time", example: "2024-11-14T02:16:14.985Z" }
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
    description: "서버 오류 - 사용자 리뷰 조회 실패",
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
    const userId = parseInt(req.params.userId);
    const sortBy = req.query.sortBy || 'latest';
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const data = {
      userId: userId,
      sortBy: sortBy,
      page: page,
      pageSize: pageSize
    }

    const result = await getUserReviews(data);
    console.log(result)
    return res.status(StatusCodes.OK).success(result);
  }catch(error){
    res.status(error.status || 500).error(error);

  }
}

export const handleGetOngoingMissions = async (req, res) => {
  /*
  #swagger.summary = '사용자의 미션 상태 조회 API'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '사용자 ID',
    required: true,
    type: 'integer',
    example: 1
  }
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
    description: "사용자의 미션 상태 조회 성공",
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
                currentPage: { type: "integer", example: 1 },
                totalPages: { type: "integer", example: 1 },
                totalItemCount: { type: "integer", example: 1 },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      userId: { type: "integer", example: 1 },
                      missionId: { type: "integer", example: 1 },
                      status: { type: "string", example: "Not Completed" },
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
  #swagger.responses[500] = {
    description: "서버 오류 - 사용자 미션 상태 조회 실패",
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
    const userId = parseInt(req.params.userId, 10);
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    
    const result = await getOngoingMissions({
      userId,
      page,
      pageSize
    });

    res.status(200).success(result);
  }catch(error){
    console.log("HERE")
    res.status(error.status || 500).error(error);
  }

};