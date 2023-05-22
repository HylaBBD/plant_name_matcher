const { constants } = require("../../config/constants");
const { responseHelper } = require("../../helper/responses.helper");
const { plantsLibrary } = require("./lib/plants.lib");
const { plantsHelper } = require("./plants.helper");

module.exports.plantsService = {
  getPlants: async () => {
    const plants = plantsLibrary.getPlants();
    if (plants && plants.length > 0) {
      return plants;
    }
    const url = `https://perenual.com/api/species-list?page=1&key=${constants.plantsAPIKeys[0]}`;

    const res = JSON.parse(JSON.stringify(await (await fetch(url)).json()));
    const mappedResponse = responseHelper.responseMapper(res.data);

    plantsLibrary.saveAllPlants(mappedResponse);

    return mappedResponse;
  },
};
