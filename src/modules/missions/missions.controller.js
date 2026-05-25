const { Controller } = require('tsoa');
const { BadRequestError } = require('../../common/errors/app.error');
const { currentMemberId } = require('../../common/utils/auth.util');
const { isPositiveInt } = require('../../common/utils/number.util');
const { getListOptions } = require('../../common/utils/pagination.util');
const missionsService = require('./missions.service');

class MissionsController extends Controller {
  async challengeMission(missionId) {
    const parsedMissionId = Number(missionId);
    const memberId = currentMemberId();

    if (!isPositiveInt(parsedMissionId)) {
      throw new BadRequestError('missionId를 확인해 주세요.');
    }

    this.setStatus(201);
    return missionsService.challengeMission(parsedMissionId, memberId);
  }

  async getMyInProgressMissions(query) {
    const memberId = currentMemberId();
    const options = getListOptions(query);

    if (!options) {
      throw new BadRequestError('limit, cursor를 확인해 주세요.');
    }

    return missionsService.getInProgressMissions(memberId, options);
  }

  async completeChallenge(missionId) {
    const parsedMissionId = Number(missionId);
    const memberId = currentMemberId();

    if (!isPositiveInt(parsedMissionId)) {
      throw new BadRequestError('missionId를 확인해 주세요.');
    }

    return missionsService.completeChallenge(parsedMissionId, memberId);
  }
}

module.exports = MissionsController;
