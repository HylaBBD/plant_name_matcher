const { constants } = require("../../config/constants");
const { responseHelper } = require("../../helper/responses.helper");
const { plantsLibrary } = require("./lib/plants.lib");
const { mapPlantResponse } = require("./plants.helper");

module.exports.plantsService = {
  getPlants: async () => {
    const plants = plantsLibrary.getPlants();
    if (plants && plants.length > 0) {
      return plants;
    }

    let responses = [];

    let res = JSON.parse(
      JSON.stringify(
        await (
          await fetch(
            `https://perenual.com/api/species-list?page=1&key=${constants.plantsAPIKeys[0]}`
          )
        ).json()
      )
    );
    responses = responses.concat(res.data);
    res = JSON.parse(
      JSON.stringify(
        await (
          await fetch(
            `https://perenual.com/api/species-list?page=2&key=${constants.plantsAPIKeys[0]}`
          )
        ).json()
      )
    );
    responses = responses.concat(res.data);
    res = JSON.parse(
      JSON.stringify(
        await (
          await fetch(
            `https://perenual.com/api/species-list?page=3&key=${constants.plantsAPIKeys[0]}`
          )
        ).json()
      )
    );
    responses = responses.concat(res.data);
    res = JSON.parse(
      JSON.stringify(
        await (
          await fetch(
            `https://perenual.com/api/species-list?page=4&key=${constants.plantsAPIKeys[0]}`
          )
        ).json()
      )
    );
    responses = responses.concat(res.data);
    res = JSON.parse(
      JSON.stringify(
        await (
          await fetch(
            `https://perenual.com/api/species-list?page=5&key=${constants.plantsAPIKeys[0]}`
          )
        ).json()
      )
    );
    responses = responses.concat(res.data);

    const mappedResponse = mapPlantResponse(responses);
    plantsLibrary.saveAllPlants(mappedResponse);

    return mappedResponse;
  },
};
