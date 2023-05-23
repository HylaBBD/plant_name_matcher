const { usersService } = require("./users.service");
const { buildResponse } = require("../response/responseUtils");
const { plantsService } = require("../plants/plants.service");
const validUsername = new RegExp(".*[A-Za-z].*");

module.exports.userController = {
  createUser: (username, password) => {
    if (!username || !password || !validUsername.test(username)) {
      return buildResponse(400, {
        message: "Failed to create user",
        reason: "Empty data",
      });
    } else {
      return usersService
        .createUser(username, password)
        .then((res) => {
          return buildResponse(200, res);
        })
        .catch((error) => {
          console.log("this");
          return buildResponse(500, error);
        });
    }
  },

  getAllUsers: () => {
    // example of controller which is called by the config function
    return usersService.getAllUsers().then((response) => {
      return buildResponse(200, response);
    });
  },
  getUserDetails: (username, password) => {
    return usersService
      .getUserDetails(username, password)
      .then((response) => {
        return buildResponse(200, response);
      })
      .catch((error) => {
        console.log(error);
        if (error.error === "Invalid credentials") {
          return buildResponse(403, error);
        } else {
          return buildResponse(500, error);
        }
      });
  },
  saveUserPlants: (userId, plantId) => {
    console.log("DOES THIS HAPPEN?");
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
