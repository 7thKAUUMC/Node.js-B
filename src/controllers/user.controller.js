import { StatusCodes } from "http-status-codes";
import { bodyToUser, responseFromUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { DuplicateUserEmailError } from "../errors.js"; // 사용자 정의 오류 가져오기

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입 요청:", req.body);

  const userData = bodyToUser(req.body);
  
  try {
    const userResponse = await userSignUp(userData);
    return res.status(StatusCodes.CREATED).success(userResponse);
  } catch (error) {
    next(error); 
  }
};
