const { responseHelper } = require("../../helper/responses.helper");

module.exports.gameSettingsService = {
  getUserDifficultySetting: (db, userId) => {
    return new Promise((resolve, reject) => {
      let sql = "select * from user_difficulty_setting where user_id = ?";
      db.all(sql, [userId], (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    })
      .then((userDifficultyData) => {
        console.log(userDifficultyData);
        return responseHelper.responseMapper(userDifficultyData[0]);
      })
      .catch((error) => {
        return error;
      });
  },
  setUserDifficultySettign: (db, userId, difficultyId) => {},
  createUserDifficultDefault: (db, userId) => {
    return new Promise((resolve, reject) => {
      let sql = "insert into user_difficulty_setting(user_id) values(?)";
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
