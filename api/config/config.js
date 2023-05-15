const { userController } = require("../modules/users/user.controller");
module.exports.config = {
  server: {
    host: "localhost",
    port: process.env.PORT || 8000,
    routes: [
      {
        url: "/user",
        method: "GET",
        function: (data) => {
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
    ],
  },
};
//for new routes att to server.routes in same format
