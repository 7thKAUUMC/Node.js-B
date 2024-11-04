import { addUser, getUserPreferencesByUserId } from "../repositories/user.repository.js";

export const userSignUp = async (userData) => {
  const user = await addUser(userData);
  return user; // 생성된 사용자 반환
};

export const getUserPreferences = async (userId) => {
  return await getUserPreferencesByUserId(userId); // 사용자 선호 카테고리 가져오기
};
