function success(data) {
  return {
    resultType: 'SUCCESS',
    error: null,
    data,
  };
}

function fail({ errorCode = 'UNKNOWN', message = '서버 오류가 발생했습니다.', data = null } = {}) {
  return {
    resultType: 'FAIL',
    error: {
      errorCode,
      message,
      data,
    },
    data: null,
  };
}

module.exports = {
  success,
  fail,
};
