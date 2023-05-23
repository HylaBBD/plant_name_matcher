const { usersService } = require("./users.service");
const { buildResponse } = require("../response/responseUtils");
const { plantsService } = require("../plants/plants.service");
const validUsername = new RegExp(".*[A-Za-z].*");

module.exports.userController = {
  createUser: (username, password) => {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        resolve(
          buildResponse(400, {
            message: "Failed to create user",
            reason: "Empty data",
          })
        );
      } else if (validUsername.test(username)) {
        usersService
          .createUser(username, password)
          .then((res) => {
            resolve(buildResponse(200, res));
          })
          .catch((err) => {
            reject(
              buildResponse(409, {
                message: "Failed to create user",
                error: err,
                reason:
                  err.code === "SQLITE_CONSTRAINT" ? "user exists" : undefined,
              })
            );
          });
      } else {
        reject(
          buildResponse(400, {
            message: "Failed to create user",
            reason: "Invalid username",
          })
        );
      }
    });
  },

  getAllUsers: () => {
    // example of controller which is called by the config function
    return usersService.getAllUsers().then((response) => {
      return buildResponse(200, response);
    });
  },
  getUserDetails: (username, password) => {
    return usersService
      .getUserDetails(username)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        if (
          error.error === "Wrong password" ||
          error.error === "Invalid User"
        ) {
          return buildResponse(403, error);
        } else {
          return buildResponse(500, error);
        }
      });
  },
  saveUserPlants: (userId, plantId) => {
    return usersService
      .saveUserPlant(userId, plantId)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
  deleteUserPlants: (userId, plantId) => {
    return usersService
      .deleteUserPlants(userId, plantId)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
  updateUserDifficulty: (id, difficultyId) => {
    // TODO check this when the service layer is written
    return usersService
      .updateUserDifficulty(id, difficultyId)
      .then((response) => {
        return buildResponse(200, response);
      });
  },
  getUserPlants: (userId) => {
    return Promise.all([
      plantsService.getPlants(),
      usersService.getUserPlants(userId),
    ])
      .then(([plants, userPlantIds]) => {
        const plantIds = userPlantIds.map((userPlants) => {
          return userPlants.plantId;
        });
        const userPlants = plants.filter((plant) =>
          plantIds.includes(plant.id)
        );

        return buildResponse(200, userPlants);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
};
