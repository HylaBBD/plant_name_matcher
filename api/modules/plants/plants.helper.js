const { constants } = require("../../config/constants");
const { responseHelper } = require("../../helper/responses.helper");

module.exports.mapPlantResponse = (plantData) => {
  const mappedData = plantData.map((plant) => {
    constants.blackListProperties.forEach((property) => {
      delete plant[property];
    });
    return plant;
  });

  return responseHelper.responseMapper(mappedData);
};
