const {
  leaderBoardsController,
} = require("../modules/leaderboards/leaderboards.controller");
const { userController } = require("../modules/users/user.controller");
const { router } = require("../modules/router/router");
const { gameController } = require("../modules/game/game.controller");
const {
  gameSettingsController,
} = require("../modules/game-settings/game-settings.controller");
const { plantsController } = require("../modules/plants/plants.controller");

routes = router();

routes.register("/user/.*[A-Za-z].*", "GET", (data) => {
  const { url } = data;
  const username = url.substr(1).split("/")[1];
  return userController.getUserDetails(username); //
});

routes.register("/user", "GET", (data) => {
  return userController.getAllUsers();
});

routes.register("/user", "POST", (data) => {
  const { password, username } = data;
  console.log(password);
  return userController.createUser(username, password);
});

routes.register("/leaderboard", "GET", (data) => {
  const limit = data.limit ? data.limit : 10;
  return leaderBoardsController.getLeaderBoards(limit);
});

routes.register("/user/\\d+/results", "GET", (data) => {
  const { url } = data;
  const id = url.substr(1).split("/")[1];
  return gameController.getUserGameResults(id);
});

routes.register("/user/\\d+/results", "POST", (data) => {
  const { url, win, layout, optionId } = data;
  const id = url.substr(1).split("/")[1];
  return gameController.createGameResult(id, optionId, layout, win);
});

routes.register("/user/\\d+/rank", "GET", (data) => {
  const { url } = data;
  const id = url.substr(1).split("/")[1];
  return leaderBoardsController.getUserRank(id);
});

routes.register("/user/\\d+/score", "GET", (data) => {
  const { url } = data;
  const id = url.substr(1).split("/")[1];
  return leaderBoardsController.getUserScore(id);
});

routes.register("/user/\\d+/difficulty", "GET", (data) => {
  const { url } = data;
  const id = url.substr(1).split("/")[1];
  return gameSettingsController.getUserDifficultySetting(id);
});

routes.register("/user/\\d+/plant", "PATCH", (data) => {
  const { url, plantId } = data;
  const id = url.substr(1).split("/")[1];
  return userController.updateUserPlants(id, plantId);
});

routes.register("/plants", "GET", (data) => {
  return plantsController.getPlants();
});

routes.register("/game", "POST", (data) => {
  return gameController.createGameResult();
});

routes.register("/user/\\d+/game", "GET", (data) => {
  const { url } = data;
  const id = url.substr(1).split("/")[1];
  return gameController.getGame(id);
});

module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    getRouteFunction: (url, method) => routes.getRoute(url, method),
  },
};
//for new routes att to server.routes in same format
