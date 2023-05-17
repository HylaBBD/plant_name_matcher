const { responseHelper } = require("../../helper/responses.helper");

module.exports.gameResultsService = {
  createGameResult: (db, userId, gameOptionId, gameLayoutId, userWin) => {
    return new Promise((resolve, reject) => {
      let sql =
        "insert into user_game_result(user_id, game_option_id, game_layout_id, win), values(?,?,?,?)";
      db.run(
        sql,
        [userId, gameOptionId, gameLayoutId, userWin ? 1 : 0],
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    })
      .then(() => {
        return { message: "success" };
      })
      .catch((error) => {
        return { message: "fail", error: error };
      });
  },
  getUserGameResults: (db, userId) => {
    return new Promise((resolve, reject) => {
      let sql =
        "select * from user_game_result ugr inner join game_options op on op.game_option_id = ugr.game_option_id inner join game_layout gl on gl.game_layout_id = ugr.game_layout_id where ugr.user_id = ?";
      db.all(sql, [userId], (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
      .then((userGameResultsData) => {
        return responseHelper.responseMapper(userGameResultsData);
      })
      .catch((error) => {
        return { error };
      });
  },
};
