const { userController } = require("../modules/users/user.controller");
module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    routes: [
      {
        url: "/user",
        method: "GET",
        function: (db) => {
          const response = new Promise((resolve, reject) => {
            resolve(userController.getAllUsers(db));
          }).then((res) => {
            return res;
          });

          return response;
        },
      },
    ],
  },
};
//for new routes att to server.routes in same format
