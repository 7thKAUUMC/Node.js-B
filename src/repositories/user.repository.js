import { prisma } from "../db.config.js";
import { DuplicateUserEmailError } from "../errors.js"; // 사용자 정의 오류 가져오기

// 사용자 정보 가져오기
export const getUser = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    console.error("중복된 이메일:", data.email); // 로그 추가
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data); // 사용자 정의 오류 발생
  }

  const createdUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birthdate: data.birthdate,
      address: data.address,
      spec_address: data.spec_address,
      phonenumber: data.phonenumber,
    }
  });

  return createdUser.id; // 사용자 ID 반환
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  return await prisma.userFavorCategory.findMany({
    where: { user_id: userId },
    include: { foodCategory: true },
  });
};

// 사용자 선호 카테고리 추가
export const setPreference = async (userId, categoryId) => {
  return await prisma.userFavorCategory.create({
    data: {
      user_id: userId,
      category_id: categoryId,
    },
  });
};
