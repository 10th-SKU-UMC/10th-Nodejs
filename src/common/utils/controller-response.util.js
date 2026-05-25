const { success } = require('../responses/api-response');

function sendControllerResult(res, controller, data) {
  return res.status(controller.getStatus() || 200).json(success(data));
}

module.exports = {
  sendControllerResult,
};
