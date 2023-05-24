const { dbHelper } = require("../../db/helper/database.helper");
const { responseHelper } = require("../../helper/responses.helper");
const {
  gameSettingsService,
} = require("../game-settings/game-settings.service");
const { plantsService } = require("../plants/plants.service");
const sql = require("mssql");

module.exports.gameService = {
  createGameResult: async (userId, gameOptionId, gameLayoutId, score) => {
    const connection = await dbHelper
      .connect()
      .then((conn) => {
        return conn;
      })
      .catch((error) => {
        console.log("this error");
        throw error;
      });

    const tx = new sql.Transaction(connection);
    await tx.begin();
    const request = new sql.Request(tx);

    let sqlQuery = `insert into user_game_results(user_id, game_option_id, game_layout_id, score) values(${userId},${gameOptionId},${gameLayoutId},${score})`;
    return await request
      .query(sqlQuery)
      .then(() => {
        sqlQuery = `select max(score) as highscore from user_game_results where user_id = ${userId}`;
        return request
          .query(sqlQuery)
          .then((scoreResult) => {
            const highscore = scoreResult.recordset[0].highscore;
            sqlQuery = `update user_highscores set highscore = ${highscore} where user_id = ${userId}`;
            return request
              .query(sqlQuery)
              .then(() => {
                tx.commit();
                connection.close();
                return { message: "success" };
              })
              .catch((error) => {
                throw error;
              });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        tx.rollback();
        connection.close();
        throw error;
      });
  },
  getUserGameResults: async (userId) => {
    let sql = `select * from user_game_results ugr inner join game_options op on op.game_option_id = ugr.game_option_id inner join game_layouts gl on gl.game_layout_id = ugr.game_layout_id where ugr.user_id = ${userId}`;
    const result = await dbHelper.executeQuery(sql);
    return responseHelper.responseMapper(result);
  },
  getGameLayouts: async () => {
    let sql = "select game_layout_id, size from game_layouts";
    const result = await dbHelper.executeQuery(sql);
    return responseHelper.responseMapper(result);
  },
  getGameData: async (userId) => {
    return Promise.all([
      this.gameService.getUserGameResults(userId),
      plantsService.getPlants(),
      gameSettingsService.getUserDifficultySetting(userId),
      this.gameService.getGameLayouts(),
    ])
      .then(([userGames, plants, userSettings, gameLayouts]) => {
        return {
          userGames: userGames,
          plants: plants,
          userSettings: userSettings,
          gameLayouts: gameLayouts,
        };
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },
};
