import { StatusCodes } from "http-status-codes";
import { createMission } from "../services/missioin.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const handleAddMission = async (req, res) => {
    console.log("??? ??? ?????!");
    console.log("body:", req.body);

    const mission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: mission });
};
