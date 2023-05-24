module.exports.gameHelper = {
  gameMapper: (data) => {
    let gameObject = {
      layout: {},
      options: data.userSettings,
      scientificNames: [],
      commonNames: [],
    };
    let completedGames = data.userGames
      ? data.userGames
          .filter((gameResult) => gameResult.score > 0)
          .map((filteredGames) => filteredGames.size)
      : 0;

    let layout;

    if (completedGames.length > 0) {
      const maxSizePlayed = Math.max(completedGames);
      layout = data.gameLayouts.find(
        (layoutOption, index) =>
          layoutOption.size > maxSizePlayed ||
          index === data.gameLayouts.length - 1
      );
    } else {
      layout = data.gameLayouts[0];
    }
    gameObject.layout = layout;
    const existingIndexes = [];
    for (let index = 0; index < layout.size; index++) {
      const plantIndex = this.gameHelper.generateRandomNumber(
        0,
        data.plants.length - 1
      );

      const selectedPlant = data.plants[plantIndex];
      if (
        !selectedPlant.scientificName.length ||
        existingIndexes.includes(plantIndex)
      ) {
        index--;
        continue;
      }
      const scientificNameIndex = this.gameHelper.generateRandomNumber(
        0,
        selectedPlant.scientificName.length - 1
      );

      gameObject.scientificNames.push(
        selectedPlant.scientificName[scientificNameIndex]
      );
      gameObject.commonNames.push(selectedPlant.commonName);
      existingIndexes.push(plantIndex);
    }

    return gameObject;
  },
  generateRandomNumber: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
