const { usersService } = require("./users.service");

const validUsername = new RegExp(".*[A-Za-z].*")

module.exports.userController = {

  createUser: (db, data) => {
    return new Promise((resolve, reject) => {
      const username = data.username;
      if (!username) {
        resolve({
          responseCode: 400,
          response: {
            message: "Failed to create user",
            reason: "Empty username"
          }
        })
      } else if (validUsername.test(username)) {
        usersService.createUser(db, username)
        .then((res) => {
          resolve({
            responseCode: 200,
            response: res
          })
        }).catch(err => {
          resolve({
            responseCode: 409,
            response: {
              message: "Failed to create user",
              error: err,
              reason: err.code === "SQLITE_CONSTRAINT" ? "user exists" : undefined,
            }
          })
        })
      } else {
        resolve({
          responseCode: 400,
          response: {
            message: "Failed to create user",
            reason: "Invalid username"
          }
        })
      }
    })
  },

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
      return {
        responseCode: 200,
        response: res
      }
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
        return {
          responseCode: 200,
          response: response
        }
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
        return {
          responseCode: 200,
          response: response
        }
      })
      .catch((error) => {
        return error;
      });
  },
};
