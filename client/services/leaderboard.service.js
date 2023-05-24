let url = 'https://jkxmi2efvf.execute-api.af-south-1.amazonaws.com';

export const leaderboardService = {
  getLeaderboard: async () => {
    const leaderboard = JSON.parse(JSON.stringify(await (await fetch(url + "/leaderboard", {
       method: "GET" })).json()));
    return leaderboard;
  },
};