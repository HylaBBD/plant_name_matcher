const { executeQuery } = require("../../connect");
const { dbHelper } = require("../../db/helper/database.helper");
const { responseHelper } = require("../../helper/responses.helper");

module.exports.leaderBoardsService = {
  getLeaderBoards: async (limit) => {
    console.log(limit);
    let sql = `select top ${limit} u.user_name, u.user_id, coalesce((select uh.highscore from user_highscores uh where uh.user_id = u.user_id), 0) as highscore, (select count(1)+1 from user_highscores where highscore > (select coalesce(highscore,0) 
    from user_highscores uh where uh.user_id = u.user_id)) as rank from users u order by rank`;

    const leaderBoard = await dbHelper.executeQuery(sql);
    return leaderBoard;
  },
  getUserRank: async (userId) => {
    let sql = `select count(user_highscore_id)+1 as rank from user_highscores where highscore > (select coalesce(highscore,0) from user_highscores where user_id = ${userId})`;

    const result = await dbHelper.executeQuery(sql);
    return result[0];
  },
  getUserScore: async (userId) => {
    let sql = `select coalesce(highscore,0) as 'score', user_highscore_id from user_highscores where user_id = '${userId}'`;
    const userScore = await dbHelper.executeQuery(sql);
    const userRank = await this.leaderBoardsService.getUserRank(userId);
    return {
      ...responseHelper.responseMapper(userScore[0]),
      ...responseHelper.responseMapper(userRank),
    };
  },
  updateUserScore: (userId, score) => {
    return new Promise((resolve, reject) => {
      let sql = "update user_highscores set highscore = ? where user_id = ?";
      db.run();
    });
  },
  createUserHighScoreEntry: async (request, userId) => {
    let sql = `insert into user_highscores(user_id) values(${userId})`;
    const result = await request.query(sql);
    return result;
  },
};
