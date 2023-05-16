const { userController } = require("../modules/users/user.controller");
module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    routes: [
      {
        url: "user",
        childRoutes: [
          {
            url: ["user"],
            queryParams: [],
            method: "GET",
            function: (data) => {
              console.log("up here worked neh");
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
            },
          },
          {
            url: ["user"],
            queryParams: [],
            method: "POST",
            function: (data) => {
              return new Promise((resolve, reject) => {
                console.log(data);
                console.log("data^");
                userController
                  .createUser(data.connection, data.username)
                  .then((res) => {
                    resolve(res);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
                .then((response) => {
                  return response;
                })
                .catch((err) => {
                  return err;
                });
            },
          },
          {
            url: ["user"],
            queryParams: ["username"],
            method: "GET",
            function: (data) => {
              console.log("It worked");
              return new Promise((resolve, reject) => {
                userController
                  .getUserDetails(data.connection, data.username)
                  .then((response) => {
                    console.log("config", response);
                    resolve(response);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
                .then((res) => {
                  console.log("config 2", res);
                  return res;
                })
                .catch((err) => {
                  return err;
                });
            },
          },
          {
            url: ["user", "leaderboard"],
            queryParams: [],
            method: "GET",
            function: (data) => {
              return new Promise((resolve, reject) => {
                userController
                  .getLeaderBoards(
                    data.connection,
                    data.body.limit ? data.body.limit : 0
                  )
                  .then((response) => {
                    resolve(response);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
                .then((response) => {
                  return response;
                })
                .catch((error) => {
                  return error;
                });
            },
          },
        ],
      },
    ],
  },
};
//for new routes att to server.routes in same format
