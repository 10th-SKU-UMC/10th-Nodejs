import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import { RegisterRoutes } from "./generated/routes";
import storeRouter from "./modules/stores/store.route";
import reviewRouter from "./modules/reviews/review.route";
import missionRouter from "./modules/missions/mission.route";
import userMissionRouter from "./modules/user_missions/user_mission.route";
import { AppError } from "./common/errors/app.error";
// res.error 커스텀 메서드 타입 확장 추가
declare global {
  namespace Express {
    interface Response {
      error: (args: { errorCode?: string | null; message?: string | null; data?: any }) => void;
    }
  }
}

// 1. 환경 변수 설정
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use((req: Request, res: Response, next: NextFunction) => {
  res.error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAIL",
      error: { errorCode, message , data },
      success: null,
    });
  };
  next();
});

// 2. 미들웨어 설정
app.use(cors());            // cors 방식 허용        
app.use(morgan("dev"));         
app.use(cookieParser());
app.use(express.static('public'));    // 정적 파일 접근      
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/test', (req, res) => {
  res.send('Hello!');
});

RegisterRoutes(app);
app.use("/api/v1", storeRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", missionRouter);
app.use("/api/v1", userMissionRouter);

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

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});