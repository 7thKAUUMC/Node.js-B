import { addMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const createMission = async (data) => {
    const missionId = await addMission({
        storeId: data.storeId,
        regionId: data.regionId,
        reward: data.reward,
        deadline: data.deadline,
        missionSpec: data.mission_spac
    });

    if (!missionId) {
        throw new Error("?? ??? ??????.");
    }

    return responseFromMission({ id: missionId, ...data});
}