import { StatusCodes } from "http-status-codes";
import { createReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleAddReview = async (req, res, next) => {
    console.log("????? ??????!");
    console.log("body:", req.body);

    const reviewData = bodyToReview(req.body);
    const review = await createReview(reviewData);
    res.status(StatusCodes.CREATED).json({ result: review });
}