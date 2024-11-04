import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null; // 이메일 중복 확인
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

  // 선호 카테고리 추가
  if (data.preferences && data.preferences.length > 0) {
    await Promise.all(data.preferences.map(categoryId => {
      return prisma.userFavorCategory.create({
        data: {
          user_id: createdUser.id, // 필드 이름 수정
          category_id: categoryId, // 필드 이름 수정
        },
      });
    }));
  }

  return createdUser; // 생성된 사용자 반환
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    where: { user_id: userId }, // 필드 이름 수정
    include: { foodCategory: true }, // 카테고리 정보도 포함
  });

  return preferences;
};
