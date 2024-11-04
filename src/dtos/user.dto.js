export const bodyToUser = (body) => {
  const birth = new Date(body.birthdate);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birthdate: birth, 
    address: body.address || "",
    spec_address: body.spec_address || "",
    phonenumber: body.phonenumber || "", 
    preferences: body.preferences || [], 
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birthdate: user.birthdate,
    address: user.address,
    spec_address: user.spec_address,
    phonenumber: user.phonenumber,
    preferCategory: preferFoods,
    created_at: user.created_at,
  };
};
