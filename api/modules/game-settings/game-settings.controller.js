const { buildResponse } = require("../response/responseUtils");
const { gameSettingsService } = require("./game-settings.service");

module.exports.gameSettingsController = {
    getUserDifficultySetting: (db, userId) => {
        return gameSettingsService.getUserDifficultySetting(db, userId)
            .then((response) => {
                return buildResponse(200, response)
            })
    },
    setUserDifficultySetting: (db, userId, difficultyId) => {
        // TODO add it to router when service layer is done
        return gameSettingsService.setUserDifficultySettign(db, userId, difficultyId)
            .then((response) => {
                return buildResponse(200, response)
            })
    }

};
