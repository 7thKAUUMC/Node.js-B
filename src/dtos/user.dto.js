export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = async (data) => {
  const {user, preferences} = data;
  console.log("DATA : ", data);
  return{
    email: user[0].email,
    name: user[0].name,
    preferCategory: preferences.map((pref) => ({
      foodCategory: pref.food_category_id,
      categoryName: pref.name,
    })),
  };
};

export const startMissionDto = (userId, missionId) => {
  return {
    member_id : userId,
    mission_id : missionId,
    status: "Not Completed"
  }
}