import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { getUserReviews, userSignUp } from "../services/user.service.js";
import { beginMission, getOngoingMissions } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
    try{
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
    }catch(error){
      res.status(500).error(error);
    }
};


export const handleStartMission = async(req, res) => {

    try{
      const { userId, missionId } = req.params;
      const result = await beginMission(userId, missionId);

      return res.status(StatusCodes.OK).success(result);
    }catch(error){
      res.status(500).error(error);
    }

}


export const handleGetUserReviews = async (req,res) => {
  try{
    const userId = parseInt(req.params.userId);
    const sortBy = req.query.sortBy || 'latest';
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const data = {
      userId: userId,
      sortBy: sortBy,
      page: page,
      pageSize: pageSize
    }

    const result = await getUserReviews(data);
    console.log(result)
    return res.status(StatusCodes.OK).success(result);
  }catch(error){
    res.status(error.status || 500).error(error);

  }
}

export const handleGetOngoingMissions = async (req, res) => {
  try{
    const userId = parseInt(req.params.userId, 10);
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    
    const result = await getOngoingMissions({
      userId,
      page,
      pageSize
    });

    res.status(200).success(result);
  }catch(error){
    console.log("HERE")
    res.status(error.status || 500).error(error);
  }

};