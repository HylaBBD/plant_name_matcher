const { dbHelper } = require("../../db/helper/database.helper");
const { responseHelper } = require("../../helper/responses.helper");
const { gameService } = require("../game/game.service");
const {
  gameSettingsService,
} = require("../game-settings/game-settings.service");
const { leaderBoardsService } = require("../leaderboards/leaderboards.service");
const sql = require("mssql");

module.exports.usersService = {
  createUser: async (username, password) => {
    let response = {};
    const connectionPool = await sql
      .connect()
      .then((conn) => {
        return conn;
      })
      .catch((error) => {
        throw error;
      });
    if (connectionPool.error) {
      throw error;
    }
    const tx = new sql.Transaction(connectionPool);
    const userQuery = `insert into users(user_name,pass_word) values('${username}','${password}'); select SCOPE_IDENTITY() as userId`;
    await tx.begin();

    const request = new sql.Request(tx);

    try {
      const result = await request.query(userQuery);
      const userId = result.recordset[0].userId;

      await leaderBoardsService.createUserHighScoreEntry(request, userId);

      await gameSettingsService.createUserDifficultDefault(request, userId);

      tx.commit();
      response = { message: "success" };
    } catch (e) {
      tx.rollback();
      response = e;
      throw e;
    }
    connectionPool.close();
    return response;
  },
  getUser: async (username, password) => {
    let sql = `select user_id, user_name from users u where u.user_name = '${username}'`;
    const result = await dbHelper.executeQuery(sql);
    if (result.length === 0) {
      throw { error: "Invalid User" };
    }
    sql = `select user_id, user_name from users u where u.user_name = '${username}' and u.pass_word = '${password}'`;
    let passwordResult = await dbHelper.executeQuery(sql);
    if (passwordResult.length === 0) {
      throw { error: "Wrong password" };
    }
    return responseHelper.responseMapper(result[0]);
  },
  getAllUsers: () => {
    return dbHelper
      .executeQuery("select * from users")
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getUserDetails: async (username, password) => {
    return this.usersService
      .getUser(username, password)
      .then((userData) => {
        return Promise.all([
          leaderBoardsService.getUserScore(userData.userId),
          gameSettingsService.getUserDifficultySetting(userData.userId),
          gameService.getUserGameResults(userData.userId),
        ])
          .then(([userScoreData, userSettings, userGameResults]) => {
            const data = {
              user: userData,
              score: userScoreData,
              settings: userSettings,
              results: userGameResults,
            };
            return data;
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  },
  saveUserPlant: (userId, plantId) => {
    let sql = `insert into user_plants(user_id, plant_id) values(${userId},${plantId})`;
    return dbHelper
      .executeQuery(sql)
      .then(() => {
        return { message: "Plant saved" };
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteUserPlants: (userId, plantId) => {
    let sql = `delete from user_plants where user_id = ${userId} and plant_id = ${plantId}`;
    return dbHelper
      .executeQuery(sql)
      .then(() => {
        return { message: "Plant removed" };
      })
      .catch((error) => {
        throw error;
      });
  },
  getUserPlants: (userId) => {
    let sql = `select plant_id from user_plants where user_id = ${userId}`;
    return dbHelper
      .executeQuery(sql)
      .then((userPlants) => {
        return responseHelper.responseMapper(userPlants);
      })
      .catch((error) => {
        throw error;
      });
  },
};
