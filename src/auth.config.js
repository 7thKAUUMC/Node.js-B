import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID, // Kakao Client ID
    clientSecret: "", 
    callbackURL: "http://localhost:3000/oauth2/callback/kakao", 
  },
  (accessToken, refreshToken, profile, done) => {
    return kakaoVerify(profile)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  }
);

const kakaoVerify = async (profile) => {
  const email = profile._json && profile._json.kakao_account.email;
  if (!email) {
    throw new Error(`Kakao profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName || profile.username || "KakaoUser",
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};