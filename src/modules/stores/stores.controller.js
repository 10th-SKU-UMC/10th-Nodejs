const { Controller } = require('tsoa');
const { BadRequestError } = require('../../common/errors/app.error');
const { isPositiveInt } = require('../../common/utils/number.util');
const { getListOptions } = require('../../common/utils/pagination.util');
const storesService = require('./stores.service');

class StoresController extends Controller {
  async createStore(regionId, requestBody) {
    const parsedRegionId = Number(regionId);
    const { name, address } = requestBody;

    if (!isPositiveInt(parsedRegionId) || !name || !address) {
      throw new BadRequestError('regionId, name, address를 확인해 주세요.');
    }

    this.setStatus(201);
    return storesService.createStore(parsedRegionId, { name, address });
  }

  async createMission(storeId, requestBody) {
    const parsedStoreId = Number(storeId);
    const { title, reward, deadline } = requestBody;

    if (!isPositiveInt(parsedStoreId) || !title || !isPositiveInt(reward) || !deadline) {
      throw new BadRequestError('storeId, title, reward, deadline을 확인해 주세요.');
    }

    this.setStatus(201);
    return storesService.createMission(parsedStoreId, { title, reward, deadline });
  }

  async getMissions(storeId, query) {
    const parsedStoreId = Number(storeId);
    const options = getListOptions(query);

    if (!isPositiveInt(parsedStoreId) || !options) {
      throw new BadRequestError('storeId, limit, cursor를 확인해 주세요.');
    }

    return storesService.getStoreMissions(parsedStoreId, options);
  }
}

module.exports = StoresController;
