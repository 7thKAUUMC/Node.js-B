import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getMissions
} from "../repositories/user.repository.js";
import { startMissionDto } from "../dtos/user.dto.js";
import { addToUserMission } from "../repositories/shop.repository.js";
import { getReviewDto } from "../dtos/review.dto.js";
import { getReviewsByUser } from "../repositories/review.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const beginMission = async (userId, missionId) => {
  const parsedData = startMissionDto(parseInt(userId,10), parseInt(missionId,10));
  const result = await addToUserMission(parsedData);

  return{
    message: result.message,
    status: result.status
  }
}

export const getUserReviews = async (data) => {
  const parsedData = getReviewDto(data);
  const result = await getReviewsByUser(parsedData);
  return result;
 }

 export const getOngoingMissions = async (data) => {
  try {
    const { totalCount, missions } = await getMissions(data);

    const formattedMissions = missions.map(mission => ({
      id: Number(mission.id.toString()),
      userId: Number(mission.member_id.toString()),
      missionId: Number(mission.mission_id.toString()),
      status: mission.status,
      createdAt: mission.created_at
    }));

    return {
      currentPage: data.page,
      totalPages: Math.ceil(totalCount / data.pageSize),
      totalItemCount: totalCount,
      data: formattedMissions
    };

  } catch (error) {
    const errorMessage = error.message || "Internal Server Error";
    const errorResponse = new Error(errorMessage);
    errorResponse.status = 500;
    throw errorResponse;
  }
};