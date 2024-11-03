import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 요청 본문 확인

  const userData = bodyToUser(req.body);
  const user = await userSignUp(userData);
  
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "회원가입에 실패했습니다." });
  }

  
  res.status(StatusCodes.CREATED).json({
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birthdate: user.birthdate,
    address: user.address,
    spec_address: user.spec_address,
    phonenumber: user.phonenumber,
    preferences: user.preferences.map(pref => ({
      id: pref.id,
      categoryId: pref.category_id,
      name: pref.name,
    })),
    created_at: new Date().toISOString(), // 생성 시간 추가
  });
};
