import { addMission, addChallengeMission } from "../repositories/mission.repository.js";
import { responseFromMission, responseFromChallengeMission } from "../dtos/mission.dto.js";

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

export const missionChallenge = async (data) => {
        const challengeId= await addChallengeMission({
            missionId: data.missionId,
            userId: data.userId,
            storeId: data.storeId,
            regionId: data.regionId,
            status: data.status
        });
    
        return responseFromChallengeMission({id: challengeId, ...data});
};