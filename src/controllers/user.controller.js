import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("????? ??????!");
  console.log("body:", req.body); // ?? ? ???? ???? ?? ????

  const user = await userSignUp(bodyToUser(req.body));
  
  res.status(StatusCodes.OK).success(user);
};
