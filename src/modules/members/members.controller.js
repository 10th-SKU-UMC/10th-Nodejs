const { Controller } = require('tsoa');
const { currentMemberId } = require('../../common/utils/auth.util');
const membersService = require('./members.service');

class MembersController extends Controller {
  async signUp(requestBody) {
    this.setStatus(201);
    return membersService.signUp(requestBody);
  }

  async login(requestBody) {
    return membersService.login(requestBody);
  }

  async getMyInfo(req) {
    const memberId = currentMemberId(req);
    return membersService.getMyInfo(memberId);
  }

  async updateMyInfo(req, requestBody) {
    const memberId = currentMemberId(req);
    return membersService.updateMyInfo(memberId, requestBody);
  }
}

module.exports = MembersController;
