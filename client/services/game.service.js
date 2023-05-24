let url = 'https://jkxmi2efvf.execute-api.af-south-1.amazonaws.com';
export const gameService = {
  getGame: async (userId) => {
    const gameConfiguration =   JSON.parse(JSON.stringify(await (await fetch(
      url + `/user/${userId}/game`,
      { method: "GET" })).json()));
    return gameConfiguration;
  },

  saveGameResults: async (userId, gameOptionId, gameLayoutId, score) => {
    const saveGameResult = await fetch(
      url + `/user/${userId}/game`,
      {
        method: "POST",
        body: JSON.stringify({
          gameOptionId: gameOptionId,
          gameLayoutId: gameLayoutId,
          score: score,
        }),
      }
    );
    return saveGameResult;
  },

  getGameResults: async (userId) => {
    const gameResults = JSON.parse(JSON.stringify(await (await fetch(url + `/user/${userId}/game`,
      { method: "GET" })).json()));
    return gameResults;
  },
};
