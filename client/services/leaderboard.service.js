export class leaderBoardService {
  getLeaderboard = async () => {
    const leaderboard = await fetch(`http://localhost:8000/leaderboard`);
    return leaderboard;
  };
}
