const { responseHelper } = require("../../helper/responses.helper");

module.exports.leaderBoardsService = {
  getLeaderBoards: (db, limit) => {
    console.log("leader board reach");
    return new Promise((resolve, reject) => {
      let sql =
        "select u.user_name, u.user_id, coalesce((select uh.highscore from user_highscore uh where uh.user_id = u.user_id), 0) as highscore, (select count(1)+1 from user_highscore where highscore > (select coalesce(highscore,0) from user_highscore uh where uh.user_id = u.user_id)) as rank from users u limit ?";

      db.all(sql, [limit], (error, data) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    })
      .then((leaderboardData) => {
        return responseHelper.responseMapper(leaderboardData);
      })
      .catch((error) => {
        return { error };
      });
  },
  getUserRank: (db, userId) => {
    return new Promise((resolve, reject) => {
      let sql =
        "select count(user_highscore_id)+1 as rank from user_highscore where highscore > (select coalesce(highscore,0) from user_highscore where user_id = ?)";
      db.all(sql, [userId], (err, rankData) => {
        if (err) {
          reject(err);
        } else {
          resolve(rankData);
        }
      });
    })
      .then((userRankData) => {
        return userRankData[0].rank;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  getUserScore: (db, userId) => {
    return new Promise((resolve, reject) => {
      let sql =
        "select user_id, highscore, user_highscore_id from user_highscore where user_id = ?";
      db.all(sql, [userId], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
      .then((userScoreData) => {
        const mappedUserScores = responseHelper.responseMapper(
          userScoreData[0]
        );
        return this.leaderBoardsService
          .getUserRank(db, userId)
          .then((rankData) => {
            return { ...mappedUserScores, rank: rankData };
          })
          .catch((error) => {
            return error;
          });
      })
      .catch((error) => {
        return error;
      });
  },
  updateUserScore: (db, userId, score) => {
    return new Promise((resolve, reject) => {
      let sql = "update user_highscore set highscore = ? where user_id = ?";
      db.run();
    });
  },
  createUserHighScoreEntry: (db, userId) => {
    return new Promise((resolve, reject) => {
      let sql = "insert into user_highscore(user_id) values(?)";
      db.run(sql, [userId], (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
      .then(() => {
        return { message: "success" };
      })
      .catch((error) => {
        return { message: "error", error: error };
      });
  },
};
