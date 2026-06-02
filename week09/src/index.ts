import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { RegisterRoutes } from "./generated/routes";
import { AppError } from "./common/errors/app.error";
import passport from "passport";
import { prisma } from "./db.config.js";

// 1. 환경 변수 설정
dotenv.config();
passport.use(googleStrategy);

import { googleStrategy, jwtStrategy } from "./auth.config.js";

passport.use(googleStrategy);
passport.use(jwtStrategy); 

const app = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(morgan('dev')); //로그포맷:dev
app.use(cookieParser());
app.use(cors());            // cors 방식 허용
app.use(express.static('public'));    // 정적 파일 접근
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(passport.initialize());

const isLogin = passport.authenticate('jwt', { session: false });

app.get('/mypage', isLogin, (req, res) => {
  res.status(200).json({
    message: `인증 성공! ${(req.user as any)?.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});


// 쿠키 만드는 라우터
app.get('/setcookie', (req, res) => {
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터
app.get('/getcookie', (req, res) => {
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie;

    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});

//Express.js에 생성한 엔드포인트들을 register
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);


app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});

// src/index.ts
import swaggerUi from "swagger-ui-express";
// ESM 환경에서는 JSON 파일을 가져올 때 아래와 같이 처리합니다.
import path from "path";
import fs from "fs";

// ... 

// 1. TSOA가 생성한 swagger.json 읽어오기
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

// 2. Swagger UI 연결
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get("/oauth2/callback/google", 
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req, res) => {
    res.status(200).json({ success: true, tokens: req.user });
  }
);