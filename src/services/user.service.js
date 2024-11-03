import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";
import { responseFromUser } from "../dtos/user.dto.js";

export const userSignUp = async (data) => {
  const { user_id } = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birthdate: data.birthdate,
    address: data.address,
    spec_address: data.spec_address,
    phonenumber: data.phonenumber,
  });

  if (!user_id) {
    throw new Error("사용자 추가에 실패했습니다."); // 사용자 추가 실패 처리
  }

  // 선호 카테고리 추가
  for (const preference of data.preferences) {
    await setPreference(user_id, preference);
  }

  const user = await getUser(user_id);
  const preferences = await getUserPreferencesByUserId(user_id);

  return { ...user, preferences }; // 반환 형식 수정
};
