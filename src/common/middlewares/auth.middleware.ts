import { Request, Response, NextFunction } from "express";
import passport from "passport";

// JWT 토큰을 검증하고 req.user에 로그인한 사용자 정보를 주입합니다.
export function authorizeUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
      if (err || !user) {
        res.status(401).json({
          resultType: "FAIL",
          error: { errorCode: "UNAUTHORIZED", message: "로그인이 필요합니다." },
          success: null,
        });
        return;
      }
      req.user = user; // 이후 req.user로 로그인한 사용자 정보에 접근 가능
      next();
    })(req, res, next);
  };
}
