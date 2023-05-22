const { buildResponse } = require("../response/responseUtils");
const { gameSettingsService } = require("./game-settings.service");

module.exports.gameSettingsController = {
  getUserDifficultySetting: (userId) => {
    return gameSettingsService
      .getUserDifficultySetting(userId)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
  setUserDifficultySetting: (userId, difficultyId) => {
    // TODO add it to router when service layer is done
    return gameSettingsService
      .setUserDifficultySettign(userId, difficultyId)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
};
