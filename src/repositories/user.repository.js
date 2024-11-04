import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const addUser = async (data) => {
  try {

    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email
      }
    });

    if (existingUser) {
      return null;
    }


    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: new Date(data.birth),
        address: data.address,
        detail_address: data.detailAddress,
        phone_number: data.phoneNumber
      }
    });

    return Number(newUser.id.toString());
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};


export const getUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return null;
    }

    return [user]; 
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};


export const setPreference = async (userId, foodCategoryId) => {
  try {
    await prisma.user_favor_category.create({
      data: {
        food_category_id: foodCategoryId,
        user_id: userId
      }
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};


export const getUserPreferencesByUserId = async (userId) => {
  try {
    const preferences = await prisma.user_favor_category.findMany({
      where: {
        user_id: userId
      },
      select: {
        id: true,
        food_category_id: true,
        user_id: true,
        food_category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        food_category_id: 'asc'
      }
    });

    return preferences.map(pref => ({
      id: Number(pref.id.toString()),
      food_category_id: Number(pref.food_category_id.toString()),
      user_id: Number(pref.user_id.toString()),
      name: pref.food_category.name
    }));
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};


export const getMissions = async (data) => {
  const totalCount = await prisma.user_mission.count({
    where: {
      member_id: data.userId,
      status: "Not Completed"
    }
  });

  const missions = await prisma.user_mission.findMany({
    where: {
      member_id: data.userId,
      status: "Not Completed"
    },
    select: {
      id: true,
      member_id: true,
      mission_id: true,
      status: true,
      created_at: true,
      mission: {
        select: {
          reward: true,
          deadline: true,
          mission_spec: true,
          store: {
            select: {
              name: true,
              address: true
            }
          }
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    },
    skip: (data.page - 1) * data.pageSize,
    take: data.pageSize
  });

  return {
    totalCount,
    missions: missions.map(mission => ({
      ...mission,
      id: Number(mission.id.toString()),
      member_id: Number(mission.member_id.toString()),
      mission_id: Number(mission.mission_id.toString())
    }))
  };
};