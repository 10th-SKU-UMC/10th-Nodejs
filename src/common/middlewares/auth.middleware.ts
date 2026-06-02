import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { UnauthorizedUserError } from "../errors/error.js";

export function authenticateJwt() {
  return passport.authenticate("jwt", { session: false });
}

export function getAuthenticatedUserId(req: Request): number {
  const userId = (req.user as { id?: unknown } | undefined)?.id;

  if (typeof userId !== "number") {
    throw new UnauthorizedUserError();
  }

  return userId;
}

export function authorizeUser() {
  return async (req: Request, res: Response, next: NextFunction) => {
    // cookie-parser가 만들어준 req.cookies 객체에서 username을 확인
    const { username } = req.cookies;
    if (username) {
      console.log(`[인증 성공] ${username}님, 환영합니다.`);
      next();
    } else {
      console.log("[인증 실패] 로그인이 필요합니다.");
      next(new UnauthorizedUserError());
    }
  };
}
