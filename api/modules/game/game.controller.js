const { responseHelper } = require("../../helper/responses.helper");
const {
  gameSettingsService,
} = require("../game-settings/game-settings.service");
const { plantsController } = require("../plants/plants.controller");
const { plantsService } = require("../plants/plants.service");
const { buildResponse } = require("../response/responseUtils");
const { gameHelper } = require("./game.helper");
const { gameService } = require("./game.service");

module.exports.gameController = {
  createGameResult: (userId, gameOptionId, gameLayout) => {
    // TODO validation
    return gameService
      .createGameResult(userId, gameOptionId, gameLayout)
      .then((res) => {
        return buildResponse(200, res);
      })
      .catch((err) => {
        return buildResponse(500, {
          message: "fail",
          error: err,
        });
      });
  },
  getUserGameResults: (userId) => {
    return gameService.getUserGameResults(userId).then((res) => {
      return buildResponse(200, res);
    });
  },
  getGame: async (userId) => {
    try {
      const gameData = await gameService.getGameData(userId);

      const gameLayout = gameHelper.gameMapper(gameData);

      return buildResponse(200, gameLayout);
    } catch (error) {
      return buildResponse(500, error);
    }
  },
};
