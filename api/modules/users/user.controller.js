const { usersService } = require("./users.service");

module.exports.userController = {
  getAllUsers: (db) => {
    console.log("lookie");
    // example of controller which is called by the config function
    const promise = new Promise((resolve, reject) => {
      resolve(usersService.getAllUsers(db));
    }).then((res) => {
      return res;
    });
    return promise;
  },
};
