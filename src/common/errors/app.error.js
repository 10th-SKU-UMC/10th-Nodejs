class AppError extends Error {
  constructor({ statusCode = 500, errorCode = 'UNKNOWN', message, data = null }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.data = data;
  }
}

class BadRequestError extends AppError {
  constructor(message, data) {
    super({ statusCode: 400, errorCode: 'BAD_REQUEST', message, data });
  }
}

class NotFoundError extends AppError {
  constructor(message, data) {
    super({ statusCode: 404, errorCode: 'NOT_FOUND', message, data });
  }
}

class ConflictError extends AppError {
  constructor(message, data) {
    super({ statusCode: 409, errorCode: 'CONFLICT', message, data });
  }
}

module.exports = {
  AppError,
  BadRequestError,
  NotFoundError,
  ConflictError,
};
