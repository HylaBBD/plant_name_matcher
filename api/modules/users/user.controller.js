const { usersService } = require("./users.service");

module.exports.userController = {
  getAllUsers: (db) => {
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
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createUser: (connection, username, password) => {
    return new Promise((resolve, reject) => {
      usersService
        .createUser(connection, username, password)
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
      .catch((error) => {
        return error;
      });
  },
  getUserDetails: (connection, username) => {
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
        .getLeaderBoards(db, limit ? limit : 10)
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
