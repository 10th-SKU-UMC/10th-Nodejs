import { AppError } from "./app.error.js";

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}

export class StoreNotFoundError extends AppError {
  constructor(storeId: number) {
    super({
      errorCode: "S001",
      statusCode: 404,
      message: "가게가 존재하지 않습니다.",
      data: { storeId },
    });
  }
}

export class DuplicateUserMissionError extends AppError {
  constructor(userId: number, missionId: number) {
    super({
      errorCode: "UM001",
      statusCode: 409,
      message: "이미 도전 중인 미션입니다.",
      data: { userId, missionId },
    });
  }
}

export class InProgressUserMissionNotFoundError extends AppError {
  constructor(userId: number, missionId: number) {
    super({
      errorCode: "UM002",
      statusCode: 404,
      message: "진행 중인 미션이 존재하지 않습니다.",
      data: { userId, missionId },
    });
  }
}

export class UnauthorizedUserError extends AppError {
  constructor() {
    super({
      errorCode: "AUTH001",
      statusCode: 401,
      message: "로그인이 필요합니다.",
    });
  }
}
