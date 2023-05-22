const { dbHelper } = require("../../db/helper/database.helper");
const { responseHelper } = require("../../helper/responses.helper");
const {
  gameSettingsService,
} = require("../game-settings/game-settings.service");
const { plantsService } = require("../plants/plants.service");

module.exports.gameService = {
  createGameResult: async (userId, gameOptionId, gameLayoutId, userWin) => {
    let sql = `insert into user_game_results(user_id, game_option_id, game_layout_id, win), values(${userId},${gameOptionId},${gameLayoutId},${userWin})`;
    const result = await dbHelper.executeQuery(sql);
    return result;
  },
  getUserGameResults: async (userId) => {
    let sql = `select * from user_game_results ugr inner join game_options op on op.game_option_id = ugr.game_option_id inner join game_layouts gl on gl.game_layout_id = ugr.game_layout_id where ugr.user_id = ${userId}`;
    const result = await dbHelper.executeQuery(sql);
    return responseHelper.responseMapper(result[0]);
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
