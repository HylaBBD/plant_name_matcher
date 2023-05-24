let url = 'https://jkxmi2efvf.execute-api.af-south-1.amazonaws.com';

export const userService = {
  login: async (username, password) => {
    const loginDetails = await fetch(
      url + `/user/${username}/${password}`,
      { method: "GET" }
    );
    console.log(loginDetails);
    return loginDetails;
  },
  register: async (username, password) => {
    const registerResponse = await fetch(url + "/user", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
    });
    return registerResponse;
  },
  getUserScoreAndRank: async (userId) => {
    const userScoreDetails = JSON.parse(
      JSON.stringify(
        await (
          await fetch(url + `/user/${userId}/score`, {
            method: "GET",
          })
        ).json()
      )
    );
    return userScoreDetails;
  },
  updateUserDifficulty: async (userId, difficultyId) => {
    const userDifficultyUpdateResponse = await fetch(
      url + `/user/${userId}/difficulty`,
      { method: "PATCH", body: JSON.parse({ difficultyId: difficultyId }) }
    );
    return userDifficultyUpdateResponse;
  },
  getUserDifficulty: async (userId) => {
    const userDifficultyResponse = await fetch(
      url + `/user/${userId}/difficulty`,
      { method: "GET" }
    );
    return userDifficultyResponse;
  },
  saveUserFavouritePlant: async (userId, plantId) => {
    const userPlantSavingResponse = await fetch(
      url + `/user/${Number(userId)}/plants`,
      { method: "POST", body: JSON.stringify({ plantId: Number(plantId) }) }
    );
    return userPlantSavingResponse;
  },
  deleteUserFavouritePlant: async (userId, plantId) => {
    console.log(Number(userId));
    const newId = +userId;
    console.log(plantId);
    const userPlantDeleteResponse = await fetch(
      url + `/user/${newId}/plants/${plantId + 1}`,
      { method: "GET" }
    );
    return userPlantDeleteResponse;
  },
  getUserFavouritePlant: async (userID) => {
    const userPlants = JSON.parse(
      JSON.stringify(
        await (
          await fetch(url + `/user/${userID}/plants`, {
            method: "GET",
          })
        ).json()
      )
    );
    return userPlants;
  },
  getUserNameById: async (userId) => {
    const userData = JSON.parse(
      JSON.stringify(
        await (
          await fetch(url + `/user/${userId}`, {
            method: "GET",
          })
        ).json()
      )
    );
    return userData;
  },
};
