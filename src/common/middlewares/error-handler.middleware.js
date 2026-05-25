const { fail } = require('../responses/api-response');

function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json(
    fail({
      errorCode: err.errorCode,
      message: err.message,
      data: err.data,
    }),
  );
}

module.exports = errorHandler;
