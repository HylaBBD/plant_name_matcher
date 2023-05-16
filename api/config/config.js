const { userController } = require("../modules/users/user.controller");
const { router } = require("../modules/router/router");

routes = router();

routes.register("/user", "GET", (data) => {
  return new Promise((resolve, reject) => {
    userController
      .getAllUsers(data.connection)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  }).then((res) => {
    console.log(4);
    console.log(res);
    return res;
  });
});

routes.register("/user", "POST", (data) => {
  return new Promise((resolve, reject) => {
    const { connection, requestContext } = data;
    resolve(userController.registerUser(connection, requestContext));
  });
});

module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    getRouteFunction: (url, method) => routes.getRoute(url, method),
  },
};
//for new routes att to server.routes in same format
