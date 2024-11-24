import { StatusCodes } from "http-status-codes";
import { bodyToReview, responseFromReview } from "../dtos/review.dto.js";
import { createReview, listUserReviews } from "../services/review.service.js"; // 서비스 호출

export const handleAddReview = async (req, res, next) => {
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
  const userId = parseInt(req.params.userId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  try {
    const reviews = await listUserReviews(userId, cursor);
    return res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    next(error); 
  }
};
