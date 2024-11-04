export const bodyToUserMission = (body) => {
  return {
    user_id: body.user_id,
    mission_id: body.mission_id,
    store_id: body.store_id,
    region_id: body.region_id,
  };
};

export const responseFromUserMission = (memberMission) => {
  return {
    id: memberMission.id,
    user_id: memberMission.user_id,
    mission_id: memberMission.mission_id,
    store_id: memberMission.store_id,
    region_id: memberMission.region_id,
    status: memberMission.status,
    created_at: memberMission.created_at,
  };
};

export const responseFromUserMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
