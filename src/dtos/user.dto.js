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

export class UserDTO {
    constructor({ user, preferences }) {
      this.email = user.email;
      this.name = user.name;
      this.preferCategory = preferences.map(pref => pref.name); 
    }
  }

// responseFromUser
export const responseFromUser = (user) => {
    if (!user) {
        return null; 
    }
    
    const userDTO = new UserDTO(user);
    
    return userDTO;
};
