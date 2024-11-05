// src/dtos/user.dto.js
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
  
  export const responseFromUser = ({ user, preferences }) => {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phoneNumber: user.phoneNumber,
      },
      preferences,
    };
  };
  