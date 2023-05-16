const { dbHelper } = require("../../db/helper/database.helper");

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
        return this.usersService
          .getUserId(db, username)
          .then((response) => {
            const userId = response.userId;
            return this.usersService
              .openLeaderBoardForNewUser(db, userId)
              .then(() => {
                return this.usersService
                  .createUserDifficultySetting(db, userId)
                  .then((res) => {
                    return this.usersService
                      .getUserDetails(db, username)
                      .then((userDetails) => {
                        return userDetails;
                      })
                      .catch((err) => {
                        return err;
                      });
                  })
                  .catch((err) => {
                    return { message: "error", error: err };
                  });
              })
              .catch((error) => {
                return error;
              });
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return {
          message: "Failed to create user",
          error: err,
          reason: err.code === "SQLITE_CONSTRAINT" ? "user exists" : undefined,
        };
      });
  },
  getUserId: (db, username) => {
    return new Promise((resolve, reject) => {
      let sql = "select user_id from users u where u.user_name = ?";
      db.all(sql, [username], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then((response) => {
        return dbHelper.dataCompiler(response[0]);
      })
      .catch((err) => {
        return err;
      });
  },
  openLeaderBoardForNewUser: (db, userId, score) => {
    let sql = "INSERT INTO user_highscore(user_id, highscore) values(?,?)"; // add to leaderboards,
    return new Promise((resolve, reject) => {
      db.run(sql, [userId, score], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then(() => {
        return;
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
        return dbHelper.dataCompiler(res);
      })
      .catch((err) => {
        return err;
      });
  },
  getUserDetails: (db, username) => {
    return new Promise((resolve, reject) => {
      let sql =
        "select * from users u inner join user_difficulty_setting uds on uds.user_id = u.user_id inner join user_highscore uh on u.user_id = uh.user_id where u.user_name = ?";
      db.all(sql, [username], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then((response) => {
        return dbHelper.dataCompiler(response[0]);
      })
      .catch((err) => {
        return { err };
      });
  },
  updateUserScore: (db, userId, score) => {}, //needs end point
  getLeaderBoards: (db, limit) => {
    let sql =
      "select uh.user_highscore_id, uh.user_id, uh.highscore, u.user_name from users u inner join user_highscore uh on u.user_id=uh.user_id limit ?";
    return new Promise((resolve, reject) => {
      db.all(sql, [limit], (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then((response) => {
        return dbHelper.dataCompiler(response);
      })
      .catch((error) => {
        return { error };
      });
  },
  getUserDifficultySetting: (db, userId) => {
    return new Promise((resolve, reject) => {
      let sql = "";
    });
  },
  setUserDifficultySettign: (sb) => {},
  createUserDifficultySetting: (db, userId) => {
    let sql = "insert into user_difficulty_setting(user_id) values(?)";
    return new Promise((resolve, reject) => {
      db.run(sql, [userId], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then(() => {
        return { message: "success" };
      })
      .catch((err) => {
        return {
          message: "Failed creating user default difficulty",
          error: err,
        };
      });
  },
};
