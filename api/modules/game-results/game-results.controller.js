const { buildResponse } = require("../response/responseUtils");
const { gameResultsService } = require("./game-results.service")

module.exports.gameResultsController = {
    createGameResult: (db, userId, gameOptionId, gameLayout) => {
        // TODO validation
        return gameResultsService.createGameResult(db, userId, gameOptionId, gameLayout)
        .then((res) => {
            return buildResponse(200, res)
        })
        .catch((err) => {
            return buildResponse(500, {
                message: "fail",
                error: err
            })
        })
    },
    getUserGameResults: (db, userId) => {
        return gameResultsService.getUserGameResults(db, userId)
        .then((res) => {
            console.log(res)
            return buildResponse(200, res)
        })
    }

};
