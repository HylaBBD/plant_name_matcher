const { responseHelper } = require("../../helper/responses.helper");
const { gameResultsService } = require("../game-results/game-results.service");
const {
  gameSettingsService,
} = require("../game-settings/game-settings.service");
const { leaderBoardsService } = require("../leaderboards/leaderboards.service");
const { buildResponse } = require("../response/responseUtils");

module.exports.usersService = {
  createUser: (db, username) => {
    let sql = "INSERT INTO users(user_name) values(?)";
    return new Promise((resolve, reject) => {
      db.run(sql, [username], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then(() => {
        return this.usersService.getUser(db, username).then((data) => {
          const userId = data.userId;
          return Promise.all([
            leaderBoardsService.createUserHighScoreEntry(db, userId),
            gameSettingsService.createUserDifficultDefault(db, userId),
          ])
            .then(([leaderBoardResponse, gameSettingResponse]) => {
              return { leaderBoardResponse, gameSettingResponse };
            })
            .catch(([highScoreError, userDifficultyError]) => {
              console.log(highScoreError);
              console.log(userDifficultyError);
              return {
                highScoreError: highScoreError,
                userDifficultyError: userDifficultyError,
              };
            });
        });
      });
  },
  getUser: (db, username) => {
    return new Promise((resolve, reject) => {
      let sql = "select user_id, user_name from users u where u.user_name = ?";
      db.all(sql, [username], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then((response) => {
        return responseHelper.responseMapper(response[0]);
      })
      .catch((err) => {
        return err;
      });
  },
  getAllUsers: (db) => {
    return new Promise((resolve, reject) => {
      let sql = "select * from users";
      db.all(sql, [], (err, res) => {
        if (err) {
          reject({ message: "Failed retieving all users", error: err });
        } else {
          resolve(res);
        }
      });
    })
      .then((res) => {
        return responseHelper.responseMapper(res);
      })
      .catch((err) => {
        return err;
      });
  },
  getUserDetails: (db, username) => {
    return this.usersService
      .getUser(db, username)
      .then((userData) => {
        return Promise.all([
          leaderBoardsService.getUserScore(db, userData.userId),
          gameSettingsService.getUserDifficultySetting(db, userData.userId),
          gameResultsService.getUserGameResults(db, userData.userId),
        ])
          .then(([userScoreData, userSettings, userGameResults]) => {
            //, userSettings, userResults
            const data = {
              user: userData,
              score: userScoreData,
              settings: userSettings,
              results: userGameResults,
            };
            console.log(data);
            return data;
          })
          .catch(() => {
            return { messgae: "fail" };
          });
      })
      .catch((error) => {
        return { message: "fail", error: error };
      });
  },
};
