export const bodyToStore = (body) => {
  return {
    name: body.name,
    address: body.address,
    region_id: body.region_id,
  };
};

export const responseFromStore = (store, regionName) => {
  if (!store) {
    throw new Error("가게 정보가 없습니다.");
  }

  return {
    id: store.id,
    name: store.name,
    address: store.address,
    region_id: store.region_id,
    region_name: regionName, 
    created_at: store.created_at, 
  };
};

export const responseFromMissions = (missions) => {
  return missions.map((mission) => ({
    id: mission.id,
    store_id: mission.store_id,
    region_id: mission.region_id,
    reward: mission.reward,
    deadline: mission.deadline,
    mission_spec: mission.mission_spec,
    created_at: mission.created_at,
  }));
};

