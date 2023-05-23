export const gameService = {
  getGame: async (userId) => {
    const gameConfiguration =   JSON.parse(JSON.stringify(await (await fetch(
      `http://localhost:8000/user/${userId}/game`,
      { method: "GET" })).json()));
    return gameConfiguration;
  },

  saveGameResults: async (userId, gameOptionId, gameLayoutId, score) => {
    const saveGameResult = await fetch(
      `http://localhost:8000/user/${userId}/game`,
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
    const gameResults = JSON.parse(JSON.stringify(await (await fetch(`http://localhost:8000/user/${userId}/game`,
      { method: "GET" })).json()));
    return gameResults;
  },
};
