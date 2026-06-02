import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUiExpress from "swagger-ui-express";
import fs from "fs";
import path from "path";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { RegisterRoutes } from "./generated/routes";
import { AppError } from "./common/errors/app.error";

declare global {
  namespace Express {
    interface Response {
      error: (args: { errorCode?: string | null; message?: string | null; data?: any }) => void;
    }
  }
}

dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy); 

const app = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAIL",
      error: { errorCode, message, data },
      success: null,
    });
  };
  next();
});

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/test", (req, res) => {
  res.send("Hello!");
});

// OAuth 라우트
app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req, res) => {
    res.status(200).json({ success: true, tokens: req.user });
  }
);

// JWT 인증 미들웨어
const isLogin = passport.authenticate("jwt", { session: false });

// 마이페이지
app.get("/mypage", isLogin, (req, res) => {
  const user = req.user as any; // ✅ auth.config.ts의 User 타입 있으면 교체
  res.status(200).json({
    resultType: "SUCCESS",
    error: null,
    success: {
      message: `인증 성공! ${user.name}님의 마이페이지입니다.`,
      user: req.user,
    },
  });
});

// Swagger
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

RegisterRoutes(app);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);
  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});