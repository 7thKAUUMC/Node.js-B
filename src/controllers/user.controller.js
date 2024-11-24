import { StatusCodes } from "http-status-codes";
import { bodyToUser, responseFromUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { DuplicateUserEmailError } from "../errors.js"; // 사용자 정의 오류 가져오기

export const handleUserSignUp = async (req, res, next) => {
 /*
  #swagger.summary = '회원가입 API';
  #swagger.description = '사용자가 회원가입을 할 수 있는 API입니다.';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: { type: "string", format: "email", example: "user@example.com" },
            name: { type: "string", example: "홍길동" },
            gender: { type: "string", enum: ["male", "female", "other"], example: "male" },
            birthdate: { type: "string", format: "date", example: "1990-01-01" },
            address: { type: "string", example: "서울시 강남구" },
            spec_address: { type: "string", example: "123-456" },
            phonenumber: { type: "string", example: "010-1234-5678" },
            preferences: { type: "array", items: { type: "number" }, example: [1, 2, 3] } // 카테고리 ID 배열
          },
          required: ["email", "name", "gender", "birthdate", "phonenumber"] // 필수 필드 지정
        }
      }
    }
  };
  
  #swagger.responses[201] = {
    description: "회원가입 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: false },
            success: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
                name: { type: "string" },
                gender: { type: "string" },
                birthdate: { type: "string", format: "date" },
                address: { type: "string" },
                spec_address: { type: "string" },
                phonenumber: { type: "string" },
                preferCategory: { type: "array", items: { type: "string" } },
                created_at: { type: "string", format: "date-time" }
              }
            }
          }
        }
      }
    }
  };
  
  #swagger.responses[400] = {
    description: "회원가입 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "DUPLICATE_EMAIL" },
                reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                data: { type: "object", example: { email: "user@example.com" } }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
  */
 
  console.log("회원가입 요청:", req.body);

  const userData = bodyToUser(req.body);
  
  try {
    const userResponse = await userSignUp(userData);
    return res.status(StatusCodes.CREATED).success(userResponse);
  } catch (error) {
    next(error); 
  }
};
