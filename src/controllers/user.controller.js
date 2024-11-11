import { StatusCodes } from "http-status-codes";
import { bodyToUser, responseFromUser } from "../dtos/user.dto.js";
import { userSignUp, getUserPreferences } from "../services/user.service.js";
import { DuplicateUserEmailError } from "../errors.js"; // 사용자 정의 오류 가져오기

export const handleUserSignUp = async (req, res) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 요청 본문 확인

  const userData = bodyToUser(req.body);
  
  try {
    const user = await userSignUp(userData);
    const preferences = await getUserPreferences(user.id); // 선호 카테고리 가져오기

    return res.status(StatusCodes.CREATED).success(responseFromUser({ user, preferences }));
  } catch (error) {
    if (error instanceof DuplicateUserEmailError) {
      return res.status(StatusCodes.BAD_REQUEST).error({
        errorCode: error.errorCode,
        reason: error.reason,
        data: error.data, // 오류 발생 시 사용자 정보를 포함
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).error({
      errorCode: "unknown",
      reason: error.message,
      data: null,
    });
  }
};
