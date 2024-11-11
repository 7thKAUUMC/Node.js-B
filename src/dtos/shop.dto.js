import { InvalidInputError } from "../errors.js"

export const registerShopDto = (body) => {
  console.log()
  // if(!body.name || !body.address || !body.regionId){
  //   throw new InvalidInputError("필수 필드가 누락되었습니다.")
  // }
  console.log()
  return {
    name : body.name,
    address: body.address,
    region: body.regionId,
  }
}

export const reviewDto = (body, shopId) => {
  return {
    shopId: shopId,
    userId: body.userId,
    stars : body.stars,
    content: body.content,
  }
}

export const missionDto = (body, shopId) => {

  const deadline = new Date(body.deadline);
  return {
    storeId: shopId,
    reward : body.reward,
    deadline: deadline,
    mission_spec: body.mission_spec
  }
}

