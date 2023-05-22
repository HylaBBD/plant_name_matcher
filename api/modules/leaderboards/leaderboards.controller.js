const { buildResponse } = require("../response/responseUtils");
const { leaderBoardsService } = require("./leaderboards.service");

module.exports.leaderBoardsController = {
  getLeaderBoards: (limit) => {
    return leaderBoardsService
      .getLeaderBoards(limit)
      .then((leaderboardsResponse) => {
        return buildResponse(200, leaderboardsResponse);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
  getUserRank: (userId) => {
    return leaderBoardsService
      .getUserRank(userId)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
  getUserScore: (userId) => {
    return leaderBoardsService
      .getUserScore(userId)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
  updateUserScore: (userId, score) => {
    // TODO add to router when service layer is done
    return leaderBoardsService
      .updateUserScore(userId, score)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
};
