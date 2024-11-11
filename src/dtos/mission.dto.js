export const bodyToMission = (body) => {
    return {
        storeId: body.storeId,
        regionId: body.regionId,
        reward: body.reward,
        deadline: body.deadline,
        mission_spec: body.mission_spec
    };
};

export const responseFromMission = (mission) => {
    return {
        storeId: mission.storeId,
        regionId: mission.regionId,
        reward: mission.reward,
        deadline: mission.deadline,
        mission_spec: mission.mission_spec,
        createdAt: mission.createdAt
    };
};