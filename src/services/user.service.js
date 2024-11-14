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
import { DuplicateUserEmailError, InternalServerError, InvalidUserError, NoReviewError } from "../errors.js";

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
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }


  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const beginMission = async (userId, missionId) => {
  try{
  const parsedData = startMissionDto(parseInt(userId,10), parseInt(missionId,10));
  const result = await addToUserMission(parsedData);

  return{
    message: result.message,
    status: result.status
  }
  }catch{
    throw new InternalServerError("등록중 오류 발생", missionId);
  }
}

export const getUserReviews = async (data) => {
  try{
    const parsedData = getReviewDto(data);
    const result = await getReviewsByUser(parsedData);
    if(result.data.length === 0){
      throw new NoReviewError("등록된 리뷰가 없습니다.");
    }
    return result;
  }catch(error){
    throw new InvalidUserError(error.message);
  }
 }

 export const getOngoingMissions = async (data) => {
    
    const { totalCount, missions } = await getMissions(data);

    const formattedMissions = missions.map(mission => ({
      id: Number(mission.id.toString()),
      userId: Number(mission.member_id.toString()),
      missionId: Number(mission.mission_id.toString()),
      status: mission.status,
      createdAt: mission.created_at
    }));

    if(formattedMissions.length === 0){
      throw new InternalServerError("진행중인 미션이 없습니다.", formattedMissions.userId);
    }

    return {
      currentPage: data.page,
      totalPages: Math.ceil(totalCount / data.pageSize),
      totalItemCount: totalCount,
      data: formattedMissions
    };

};