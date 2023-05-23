module.exports.gameService = {
  getGame: async (userId) => {
    const gameConfiguration = await fetch(
      `http://localhost:8000/user/${userId}/game`,
      { method: "GET" }
    );
    return gameConfiguration;
  },
  saveGameResults: async (userId, gameOptionId, gameLayoutId, score) => {
    const saveGameResult = await fetch(
      `http://localhost:8000/user/${userId}/game`,
      {
        method: "POST",
        body: {
          gameOptionId: gameOptionId,
          gameLayoutId: gameLayoutId,
          score: score,
        },
      }
    );
    return saveGameResult;
  },

  getGameResults: async (userId) => {
    const gameResults = await fetch(
      `http://localhost:8000/user/${userId}/game`,
      { method: "GET" }
    );

    return gameResults;
  },
};
