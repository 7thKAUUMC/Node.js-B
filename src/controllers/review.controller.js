import { StatusCodes } from "http-status-codes";
import { bodyToReview, responseFromReview, responseFromReviews } from "../dtos/review.dto.js";
import { createReview, listUserReviews } from "../services/review.service.js"; // 서비스 호출

export const handleAddReview = async (req, res) => {
  console.log("리뷰 추가 요청이 들어왔습니다!");
  console.log("body:", req.body); // 요청 본문 확인

  const reviewData = bodyToReview(req.body);

  try {
    const { review, storeName } = await createReview(reviewData); 
    
    const response = responseFromReview(review, storeName); 
    res.status(StatusCodes.CREATED).json({
      resultType: "SUCCESS",
      error: null,
      success: response,
    });
  } catch (error) {
    console.error("오류 발생:", error); // 오류 로그 추가
    res.status(StatusCodes.BAD_REQUEST).json({
      resultType: "FAIL",
      error: {
        errorCode: "R001", // 오류 코드
        reason: error.message,
        data: reviewData,
      },
      success: null,
    });
  }
};

export const handleListUserReviews = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  try {
    const reviews = await listUserReviews(userId, cursor);
    res.status(StatusCodes.OK).json({
      resultType: "SUCCESS",
      error: null,
      success: reviews,
    });
  } catch (error) {
    console.error("오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      resultType: "FAIL",
      error: {
        errorCode: "R002", // 오류 코드
        reason: error.message,
        data: null,
      },
      success: null,
    });
  }
};
