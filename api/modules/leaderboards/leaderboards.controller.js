const { buildResponse } = require("../response/responseUtils");
const { leaderBoardsService } = require("./leaderboards.service");

module.exports.leaderBoardsController = {
  getLeaderBoards: (db, limit) => {
      return leaderBoardsService
      .getLeaderBoards(db, limit)
      .then((leaderboardsResponse) => {
        return buildResponse(200, leaderboardsResponse);
      })
  },
  getUserRank: (db, userId) => {
    return leaderBoardsService.getUserRank(db, userId)
      .then((response) => {
          return buildResponse(200, response)
      })
  },
  getUserScore: (db, userId) => {
    return leaderBoardsService.getUserScore(db, userId)
      .then((response) => {
          return buildResponse(200, response)
      })
  },
  updateUserScore: (db, userId, score) => {
    // TODO add to router when service layer is done
    return leaderBoardsService.updateUserScore(db, userId, score)
          .then((response) => {
            return buildResponse(200, response)
          })
  },
};
