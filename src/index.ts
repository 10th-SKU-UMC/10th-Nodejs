import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUiExpress from "swagger-ui-express";
import fs from "fs";
import path from "path";
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

app.get("/test", (req, res) => {
  res.send("Hello!");
});

// Swagger (TSOA 방식)
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