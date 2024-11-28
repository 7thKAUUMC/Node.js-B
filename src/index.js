import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleUserSignUp,  handleUpdateUser } from './controllers/user.controller.js';
import { handleAddStore, handleListStoreMissions } from './controllers/store.controller.js';
import { handleAddReview, handleListUserReviews } from "./controllers/review.controller.js"; 
import { handleAddUserMission, handleListUserMissions } from './controllers/user_mission.controller.js'; 
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy, naverStrategy } from "./auth.config.js"; // NaverStrategy 추가
import { prisma } from "./db.config.js";

dotenv.config();

// Passport 설정
passport.use(googleStrategy);
passport.use(naverStrategy); // NaverStrategy 추가
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Express 앱 설정
const app = express();
const port = process.env.PORT;

// CORS 및 정적 파일 미들웨어 설정
app.use(cors());                            // CORS 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 세션 설정
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
    }),
  })
);

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 공통 응답 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

// Swagger 설정
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

// OpenAPI 문서 제공
app.get("/openapi.json", async (req, res, next) => {
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 기본 라우트
app.get("/", (req, res) => {
  console.log(req.user); // 현재 로그인된 사용자의 정보를 콘솔에 출력
  res.send("Hello World!");
});

// Google OAuth 라우트
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// Naver OAuth 라우트
app.get("/oauth2/login/naver", passport.authenticate("naver"));

app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/oauth2/login/naver",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/") // 로그인 성공 후 리다이렉트
);

// API 엔드포인트
app.post("/api/users/", handleUserSignUp);
app.post("/api/stores/", handleAddStore);
app.post("/api/users/store/reviews/", handleAddReview);
app.post("/api/users/store/user_missions/", handleAddUserMission);
app.get("/api/users/:userId/reviews", handleListUserReviews);
app.get("/api/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/users/:userId/doing_missions", handleListUserMissions);
app.put("/api/users/:userId/update", handleUpdateUser);



// 전역 오류 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
