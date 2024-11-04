import { StatusCodes } from "http-status-codes";
import { bodyToUser, responseFromUser } from "../dtos/user.dto.js";
import { userSignUp, getUserPreferences } from "../services/user.service.js"; // 서비스에서 가져오기

export const handleUserSignUp = async (req, res) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 요청 본문 확인

  const userData = bodyToUser(req.body);
  const user = await userSignUp(userData);
  
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "이미 사용 중인 이메일입니다." });
  }

  const preferences = await getUserPreferences(user.id); // 선호 카테고리 가져오기

  res.status(StatusCodes.CREATED).json(responseFromUser({ user, preferences }));
};
