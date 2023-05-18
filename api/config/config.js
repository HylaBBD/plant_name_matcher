const {
  leaderBoardsController,
} = require("../modules/leaderboards/leaderboards.controller");
const { userController } = require("../modules/users/user.controller");
const { router} = require("../modules/router/router");
const { gameResultsController } = require("../modules/game-results/game-results.controller");
const { gameSettingsController } = require("../modules/game-settings/game-settings.controller");

routes = router();

routes.register("/user/.*[A-Za-z].*", "GET", (data) => {
  const {connection, url} = data
  const username = url.substr(1).split("/")[1]
  return userController.getUserDetails(connection, username)
})

routes.register("/user", "GET", (data) => {
  return userController.getAllUsers(data.connection)
})

routes.register("/user", "POST", (data) => {
  const {connection, username} = data;
  return userController.createUser(connection, username)
})

routes.register("/leaderboard", "GET", (data) => {
  const {connection} = data;
  const limit = data.limit ? data.limit : 10;
  return leaderBoardsController.getLeaderBoards(connection, limit);
})

routes.register("/user/\\d+/results", "GET", (data) => {
  const { connection, url } = data;
  const id = url.substr(1).split("/")[1];
  return gameResultsController.getUserGameResults(connection, id);
})

routes.register("/user/\\d+/results", "POST", (data) => {
  const { connection, url, win, layout, optionId } = data;
  const id = url.substr(1).split("/")[1];
  return gameResultsController.createGameResult(connection, id, optionId, layout, win);
})

routes.register("/user/\\d+/rank", "GET", (data) => {
  const { connection, url } = data;
  const id = url.substr(1).split("/")[1];
  return leaderBoardsController.getUserRank(connection, id);
})

routes.register("/user/\\d+/score", "GET", (data) => {
  const { connection, url } = data;
  const id = url.substr(1).split("/")[1];
  return leaderBoardsController.getUserScore(connection, id);
})

routes.register("/user/\\d+/difficulty", "GET", (data) => {
  const { connection, url } = data;
  const id = url.substr(1).split("/")[1];
  return gameSettingsController.getUserDifficultySetting(connection, id)
})

routes.register("/user/\\d+/plant", "PATCH", (data) => {
  const { connection, url, plantId } = data;
  const id = url.substr(1).split("/")[1];
  return userController.updateUserPlants(connection, id, plantId)
})

module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    getRouteFunction: (url, method) => routes.getRoute(url, method),
  },
};
//for new routes att to server.routes in same format
