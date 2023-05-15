const { usersService } = require("./users.service");

module.exports.userController = {
  getAllUsers: (db) => {
    console.log("lookie");
    // example of controller which is called by the config function
    return new Promise((resolve, reject) => {
      usersService
        .getAllUsers(db)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    }).then((res) => {
      console.log("3");
      console.log(res);
      return res;
    });
  },
};