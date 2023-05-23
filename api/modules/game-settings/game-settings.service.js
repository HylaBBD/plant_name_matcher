const { dbHelper } = require("../../db/helper/database.helper");
const { responseHelper } = require("../../helper/responses.helper");

module.exports.gameSettingsService = {
  getUserDifficultySetting: async (userId) => {
    let sql = `select ds.difficulty_setting_id, ds.difficulty_display_value from user_difficulty_settings uds inner join difficulty_settings ds on ds.difficulty_setting_id = uds.difficulty_setting_id where user_id = ${userId}`;
    const result = await dbHelper.executeQuery(sql);
    return responseHelper.responseMapper(result[0]);
  },
  setUserDifficultySettign: (userId, difficultyId) => {
    let sql = `update user_difficulty_settings set difficulty_setting_id = ${difficultyId} where user_id = ${userId}`;
    return dbHelper
      .executeQuery(sql)
      .then(() => {
        return { message: "updated settings" };
      })
      .catch((error) => {
        throw error;
      });
  },
  createUserDifficultDefault: async (request, userId) => {
    let sql = `insert into user_difficulty_settings(user_id) values(${userId})`;
    return request
      .query(sql)
      .then(() => {
        return { message: "created user difficulty" };
      })
      .catch((error) => {
        throw error;
      });
  },
};
