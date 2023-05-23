const { buildResponse } = require("../response/responseUtils");
const { plantsService } = require("./plants.service");

module.exports.plantsController = {
  getPlants: () => {
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
