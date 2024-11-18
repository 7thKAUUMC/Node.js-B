import { StatusCodes } from "http-status-codes";
import { createMission, missionChallenge } from "../services/missioin.service.js";
import { bodyToMission, bodyToChallengeMission } from "../dtos/mission.dto.js";

export const handleAddMission = async (req, res) => {
    console.log("request to add mission");
    console.log("body:", req.body);

    const mission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: mission });
};

export const handleChallengeMission = async (req, res) => {
    console.log("request to add challengemission");
    console.log("body:", req.body);

    const missionData = await missionChallenge(bodyToChallengeMission(req.body));
    res.status(StatusCodes.OK).json({ result: missionData });
}