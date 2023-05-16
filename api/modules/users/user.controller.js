const { usersService } = require("./users.service");

module.exports.userController = {
  getAllUsers: (db) => {
    console.log("lookie");
    // example of controller which is called by the config function
    return new Promise((resolve, reject) => {
      usersService
        .getAllUsers(db)
        .then((response) => {
          console.log("controller", response);
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
  createUser: (connection, username) => {
    return new Promise((resolve, reject) => {
      usersService
        .createUser(connection, username)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }).then((res) => {
      return res;
    });
  },
  getUserDetails: (connection, username) => {
    console.log("this worked then");
    return new Promise((resolve, reject) => {
      usersService
        .getUserDetails(connection, username)
        .then((response) => {
          resolve(response);
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
  getLeaderBoards: (db, limit) => {
    return new Promise((resolve, reject) => {
      usersService
        .getLeaderBoards(db, limit)
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
};
