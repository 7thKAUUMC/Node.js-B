import { StatusCodes } from "http-status-codes";
import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import { createReview, listUserReviews } from "../services/review.service.js"; // 서비스 호출

export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '특정 가게에 리뷰 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" },
              store_id: { type: "number" },
              body: { type: "string" },
              score: { type: "number" },
              region_id: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 추가 성공 응답",
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
                  user: { type: "object", properties: { id: { type: "number" } } },
                  store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                  body: { type: "string" },
                  score: { type: "number" },
                  created_at: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string" },
                  data: {}
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

  console.log("리뷰 추가 요청이 들어왔습니다!");
  console.log("body:", req.body); // 요청 본문 확인

  const reviewData = bodyToReview(req.body);

  try {
    const { review, storeName } = await createReview(reviewData); 
    const response = responseFromReview(review, storeName); 
    return res.status(StatusCodes.CREATED).success(response);
  } catch (error) {
    next(error); 
  }
};

export const handleListUserReviews = async (req, res, next) => {
   /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자의 ID',
      required: true,
      type: 'integer'
    };
    #swagger.responses[200] = {
      description: "사용자 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        body: { type: "string" },
                        score: { type: "number" },
                        created_at: { type: "string", format: "date-time" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } }
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
                  errorCode: { type: "string", example: "R002" },
                  reason: { type: "string" },
                  data: {}
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
    const reviews = await listUserReviews(userId, cursor);
    return res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    next(error); 
  }
};
