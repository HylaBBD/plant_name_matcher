const { usersService } = require("./users.service");
const { buildResponse } = require("../response/responseUtils")
const validUsername = new RegExp(".*[A-Za-z].*")
const validId = new RegExp("\\d+")


module.exports.userController = {
  getHighScore: (db, id) => {
    return new Promise((resolve, reject) => {
      resolve(buildResponse(200, {
        message: "success",
        id: id
      }))
    })
  },

  addPlant: (db, data, id) => {
    return new Promise((resolve, reject) => {
        const plantId = data.plantId;

        if (!plantId) {
          resolve(buildResponse(400, {
            message: "No PlantId",
            reason: "No PlantId"
          }))
        } else if (!validId.test(plantId)) {
          resolve(buildResponse(400, {
            message: "Invalid PlantId",
            reason: "Invalid PlantId"
          }))
        } else {
          resolve(buildResponse(200, {
            message: "success"
          }))
        }
    })
  },

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
      return buildResponse(200, res)
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
        return buildResponse(200, response)
      })
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
        return buildResponse(200, response)
      })
  },
};
