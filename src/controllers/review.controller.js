// import { StatusCodes } from "http-status-codes";
import { createReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '�?�? 추가하기 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              userId: { type: "number" },
              regionId: { type: "number" },
              body: { type: "string" },
              score: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "�?�? 추가 성공 응답",
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
                  id: { type: "number" },
                  storeId: { type: "number" },
                  userId: { type: "number" },
                  body: { type: "string" },
                  score: { type: "number" },
                  createdAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "�?�? 추가 실패 응답",
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
    console.log("request to add review");
    console.log("body:", req.body);

    const reviewData = bodyToReview(req.body);
    const review = await createReview(reviewData);
    res.status(StatusCodes.CREATED).json({ result: review });
}