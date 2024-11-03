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
