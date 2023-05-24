export const leaderboardService = {
  getLeaderboard: async () => {
    const leaderboard = JSON.parse(JSON.stringify(await (await fetch("http://localhost:8000/leaderboard", {
       method: "GET" })).json()));
    console.log(leaderboard);
    return leaderboard;
  },
};