const { isPositiveInt } = require('./number.util');

function getListOptions({ limit = 10, cursor = null } = {}) {
  const parsedLimit = Number(limit);
  const parsedCursor = cursor ? Number(cursor) : null;

  if (!isPositiveInt(parsedLimit) || parsedLimit > 50) {
    return null;
  }

  if (parsedCursor !== null && !isPositiveInt(parsedCursor)) {
    return null;
  }

  return { limit: parsedLimit, cursor: parsedCursor };
}

module.exports = {
  getListOptions,
};
