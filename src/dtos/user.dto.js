export const bodyToUser = (body) => {
  const birth = new Date(body.birthdate); // 'birthdate'로 수정

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birthdate: birth, // 'birthdate'로 수정
    address: body.address || "",
    spec_address: body.spec_address || "", // 'spec_address'로 수정
    phonenumber: body.phonenumber, // 'phonenumber'로 수정
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  if (!user) {
    throw new Error("사용자 정보가 없습니다.");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birthdate: user.birthdate, // 'birthdate'로 수정
    address: user.address,
    spec_address: user.spec_address, // 'spec_address'로 수정
    phonenumber: user.phonenumber, // 'phonenumber'로 수정
    preferences: preferences.map(pref => ({
      id: pref.id,
      categoryId: pref.category_id, // 'category_id'로 수정
      name: pref.name,
    })),
  };
};
