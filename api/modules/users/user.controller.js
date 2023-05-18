const { usersService } = require("./users.service");
const { buildResponse } = require("../response/responseUtils")
const validUsername = new RegExp(".*[A-Za-z].*")


module.exports.userController = {
  createUser: (db, username) => {
    return new Promise((resolve, reject) => {
      if (!username) {
        resolve(buildResponse(400, {
          message: "Failed to create user",
          reason: "Empty username"
        }))
      } else if (validUsername.test(username)) {
        usersService.createUser(db, username)
        .then((res) => {
          resolve(buildResponse(200, res))
        }).catch(err => {
          resolve(buildResponse(409, {
            message: "Failed to create user",
            error: err,
            reason: err.code === "SQLITE_CONSTRAINT" ? "user exists" : undefined,
          }))
        })
      } else {
        resolve(buildResponse(400,{
          message: "Failed to create user",
          reason: "Invalid username"
        }))
      }
    })
  },

  getAllUsers: (db) => {
    // example of controller which is called by the config function
    return usersService.getAllUsers(db)
          .then((response) => {
            return buildResponse(200, response);
          });
  },
  getUserDetails: (connection, username) => {
    return usersService.getUserDetails(connection, username)
          .then((response) => {
            return buildResponse(200, response)
          })
  },
  updateUserPlants: (connection, id, plantId) => {
    // TODO check this when the service layer is written
    return usersService.updateUserPlants(connection, id, plantId)
        .then((response) => {
          return buildResponse(200, response)
        })
  },
  updateUserDifficulty: (connection, id, difficultyId) => {
    // TODO check this when the service layer is written
    return usersService.updateUserDifficulty(connection, id, difficultyId)
        .then((response) => {
          return buildResponse(200, response);
        })
  }
};
