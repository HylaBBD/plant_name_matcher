const { constants } = require("../../config/constants");
const { buildResponse } = require("../response/responseUtils");
const { plantsHelper } = require("./plants.helper");
const { plantsLibrary } = require("./lib/plants.lib");
const { plantsService } = require("./plants.service");

module.exports.plantsController = {
  getPlants: async () => {
    return plantsService
      .getPlants()
      .then((plants) => {
        return buildResponse(200, plants);
      })
      .catch((error) => {
        return buildResponse(500, error);
      });
  },
  getUserPlants: (userId) => {},
};
