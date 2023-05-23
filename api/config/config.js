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

routes.register("/user/.*[A-Za-z].*/.*[A-Za-z].*", "GET", (data) => {
  const { url } = data;
  const splitUrl = url.substr(1).split("/");
  const username = splitUrl[1];
  const password = splitUrl[2];
  console.log(password);
  return userController.getUserDetails(username);
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

routes.register("/user/\\d+/difficulty", "PATCH", (data) => {
  const { url, difficultySettingId } = data;
  const id = url.substr(1).split("/")[1];
  return gameSettingsController.setUserDifficultySetting(
    id,
    difficultySettingId
  );
});

routes.register("/plants", "GET", (data) => {
  return plantsController.getPlants();
});

routes.register("/user/\\d+/game", "POST", (data) => {
  const { gameOptionId, gameLayoutId, score, url } = data;
  const userId = url.substr(1).split("/")[1];
  return gameController.createGameResult(
    userId,
    gameOptionId,
    gameLayoutId,
    score
  ); //userId, gameOptionId, gameLayoutId, score
});

routes.register("/user/\\d+/game", "GET", (data) => {
  const { url } = data;
  const id = url.substr(1).split("/")[1];
  return gameController.getGame(id);
});

routes.register("/user/\\d+/plants", "POST", (data) => {
  const { url, plantId } = data;
  const id = url.substr(1).split("/")[1];
  return userController.saveUserPlants(id, plantId);
});

routes.register("/user/\\d+/plants", "GET", (data) => {
  const { url } = data;
  const id = url.substr(1).split("/")[1];
  return userController.getUserPlants(id);
});

routes.register("/user/\\d+/plants", "DELETE", (data) => {
  const { url, plantId } = data;
  const id = url.substr(1).split("/")[1];
  return userController.deleteUserPlants(id, plantId);
});

module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    getRouteFunction: (url, method) => routes.getRoute(url, method),
  },
};
//for new routes att to server.routes in same format
