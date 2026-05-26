const { Controller } = require('tsoa');
const { BadRequestError } = require('../../common/errors/app.error');
const { currentMemberId } = require('../../common/utils/auth.util');
const { isPositiveInt } = require('../../common/utils/number.util');
const { getListOptions } = require('../../common/utils/pagination.util');
const reviewsService = require('./reviews.service');

class ReviewsController extends Controller {
  async createReview(storeId, requestBody) {
    const parsedStoreId = Number(storeId);
    const memberId = currentMemberId();
    const { rating, content } = requestBody;

    if (!isPositiveInt(parsedStoreId) || !isPositiveInt(rating) || Number(rating) > 5 || !content) {
      throw new BadRequestError('storeId, rating(1~5), content를 확인해 주세요.');
    }

    this.setStatus(201);
    return reviewsService.createReview(parsedStoreId, memberId, { rating, content });
  }

  async getMyReviews(query) {
    const memberId = currentMemberId();
    const options = getListOptions(query);

    if (!options) {
      throw new BadRequestError('limit, cursor를 확인해 주세요.');
    }

    return reviewsService.getMemberReviews(memberId, options);
  }
}

module.exports = ReviewsController;
