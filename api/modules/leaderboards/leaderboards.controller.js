const { buildResponse } = require("../response/responseUtils");
const { leaderBoardsService } = require("./leaderboards.service");

module.exports.leaderBoardsController = {
  getLeaderBoards: (db, limit) => {
    return new Promise((resolve, reject) => {
      leaderBoardsService
        .getLeaderBoards(db, limit)
        .then((leaderboard) => {
          resolve(leaderboard);
        })
        .catch((error) => {
          reject(error);
        });
    })
      .then((leaderboardsResponse) => {
        return buildResponse(200, leaderboardsResponse);
      })
      .catch((error) => {
        return error;
      });
  },
  getUserRank: (db, userId) => {
    return new Promise((resolve, reject) => {});
  },
  updateUserScore: (db, userId, score) => {
    return new Promise((resolve, reject) => {});
  },
};
