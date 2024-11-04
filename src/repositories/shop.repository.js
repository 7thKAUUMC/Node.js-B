import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addShop = async (data) => {
  try {
    const result = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        regionId: data.regionId,
      },
    });
    
    return {
      storeId: Number(result.id), 
      message: "성공적으로 등록되었습니다.",
      status: 201
    };
  } catch (error) {
    console.error("=== 에러 발생 ===");
    console.error("Error:", error);
    
    throw {
      status: 500,
      message: error.message || "Internal Server Error"
    };
  }
};

export const addReview = async(data) => {
  try {

    const result = await prisma.review.create({
      data: {
        user: {
          connect: { id: data.userId }  
        },
        store: {
          connect: { id: data.shopId }  
        },
        body: data.content,
        score: data.stars,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    return {
      message: "성공적으로 리뷰를 등록했습니다.",
      status: 201,
    }
  } catch(error) {
    console.error("Review creation error:", error);
    throw {
      status: 500,
      message: error.message || "Internal Server Error"
    }; 
  }
}
export const addMission = async(data) => {
 try {
   const result = await prisma.mission.create({
     data: {
       store_id: data.storeId,
       reward: data.reward,
       deadline: data.deadline,
       mission_spec: data.mission_spec 
     }
   });

   return {
     message: "성공적으로 미션을 등록했습니다.",
     status: 201
   }
 } catch(error) {
   throw {
     status: 500,
     message: error.message || "Internal Server Error"
   }; 
 }
};

export const addToUserMission = async (data) => {
 try {

   const existingMission = await prisma.user_mission.findFirst({
     where: {
       AND: [
         { member_id: data.member_id },
         { mission_id: data.mission_id }
       ]
     }
   });

   if(existingMission) {
     return null;
   }

   const result = await prisma.user_mission.create({
     data: {
       member_id: data.member_id,
       mission_id: data.mission_id,
       status: data.status
     }
   });

   return {
     message: "성공적으로 미션을 시작했습니다.",
     status: 201
   }
 } catch(error) {
   throw {
     status: 500,
     message: error.message || "Internal Server Error"
   }; 
 }
};


export const getShopMissionList = async (data) => {
  const totalCount = await prisma.mission.count({
    where: {
      store_id: data.shopId
    }
  });

  const missions = await prisma.mission.findMany({
    where: {
      store_id: data.shopId
    },
    select: {
      id: true,
      store_id: true,
      reward: true,
      deadline: true,
      mission_spec: true,
      created_at: true
    },
    orderBy: {
      created_at: 'desc'
    },
    skip: (data.page - 1) * data.pageSize,
    take: data.pageSize
  });

  return {
    totalCount,
    missions
  };
};