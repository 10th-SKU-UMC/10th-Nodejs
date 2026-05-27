import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";
import swaggerUi from "swagger-ui-express";
// ESM 환경에서는 JSON 파일을 가져올 때 아래와 같이 처리합니다.
import path from "path";
import fs from "fs";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";

// 1. 환경 변수 설정
dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy);

const app: Express = express();
const port = process.env.PORT || 3000;
app.use((req: Request, res: Response, next: NextFunction) => {
  res.error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});

const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

// Swagger UI 연결
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// 2. 미들웨어 설정
app.use(
  cors({
    //1. origin을 * 대신 정확한 주소 사용 
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"], 

    // 2. 쿠키를 허용하는 credentials 옵션 켜기
    credentials: true, 
  })
);
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(cookieParser());
app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get("/oauth2/callback/google", 
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req, res) => {
    res.status(200).json({ success: true, tokens: req.user });
  }
);


app.use(passport.initialize());
// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router); 
app.use("/api/v1", router);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || null,
    data: err.data || null,
  });
});

const isLogin = passport.authenticate('jwt', { session: false });
app.get('/mypage', isLogin, (req, res) => {
  res.status(200).json({
    success: true,
    message: `인증 성공! ${req.user}님의 마이페이지입니다.`,
    user: req.user,
  });
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});
