export const userService = {
  login: async (username, password) => {
    const loginDetails = await fetch(
      `http://localhost:8000/user/${username}/${password}`,
      { method: "GET" }
    );
    console.log(loginDetails);
    return loginDetails;
  },
  register: async (username, password) => {
    const registerResponse = await fetch("http://localhost:8000/user", {
      method: "POST",
      body: { username: username, password: password },
    });
    return registerResponse;
  },
  getUserScoreAndRank: async (userId) => {
    const userScoreDetails = await fetch(
      `http://localhost:8000/user/${userId}/score`,
      { method: "GET" }
    );
    return userScoreDetails;
  },
  updateUserDifficulty: async (userId, difficultyId) => {
    const userDifficultyUpdateResponse = await fetch(
      `http://localhost:8000/user/${userId}/difficulty`,
      { method: "PATCH", body: { difficultyId: difficultyId } }
    );
    return userDifficultyUpdateResponse;
  },
  getUserDifficulty: async (userId) => {
    const userDifficultyResponse = await fetch(
      `http://localhost:8000/user/${userId}/difficulty`,
      { method: "GET" }
    );
    return userDifficultyResponse;
  },
  saveUserFavouritePlant: async (userId, plantId) => {
    const userPlantSavingResponse = await fetch(
      `http://localhost:8000/user/${userId}/plants`,
      { method: "POST", body: { plantId: plantId } }
    );
    return userPlantSavingResponse;
  },
  deleteUserFavouritePlant: async (userId, plantId) => {
    const userPlantDeleteResponse = await fetch(
      `http://localhost:8000/user/${userId}/plants`,
      { method: "DELETE", body: { plantId: plantId } }
    );
    return userPlantDeleteResponse;
  },
  getUserFavouritePlant: async (userID) => {
    const userPlants = JSON.parse(JSON.stringify(await (await fetch(`http://localhost:8000/user`, { method: "GET" })).json()));
    return userPlants;
  },
};
