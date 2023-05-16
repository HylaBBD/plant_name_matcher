const { userController } = require("../modules/users/user.controller");
const { router} = require("../modules/router/router");

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
  const {connection, requestContext} = data;
  return userController.createUser(connection, requestContext)
})

routes.register("/leaderboard", "GET", (data) => {
  const {connection, queryParameters} = data;
  const limit = queryParameters.limit ? queryParameters.limit : 100;
  return userController.getLeaderBoards(connection, limit);
})

module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    getRouteFunction: (url, method) => routes.getRoute(url, method),
  },
};
//for new routes att to server.routes in same format
