import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import NaverStrategy from "passport-naver"; // NaverStrategy 임포트
import { prisma } from "./db.config.js";

dotenv.config();

// Google 로그인 전략
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findOrCreateUser(profile);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

// Naver 로그인 전략
export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/naver",
    profileFields: ['email', 'displayName'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findOrCreateUser(profile); // 공통 함수 사용
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

// 사용자 찾기 및 생성 함수
const findOrCreateUser = async (profile) => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error(`Profile email not found: ${JSON.stringify(profile)}`);
  }

  // 기존 사용자 검색
  let user = await prisma.user.findFirst({ where: { email } });

  // 사용자가 없으면 새로 생성
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: "추후 수정",
        birthdate: new Date(1970, 0, 1), // 기본값
        address: "추후 수정",
        spec_address: "추후 수정",
        phonenumber: "추후 수정",
      },
    });
  }

  return { id: user.id, email: user.email, name: user.name };
};
