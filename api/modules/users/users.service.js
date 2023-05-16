module.exports.usersService = {
  createUser: (db, username) => {
    let sql = "INSERT INTO users(user_name) values(?)"; // add to leaderboards,
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
            return this.usersService
              .openLeaderBoardForNewUser(db, response.userId, 0)
              .then(() => { 
                return { message: "success" }
              })
          })
      });
  },
  getUserId: (db, username) => {
    return new Promise((resolve, reject) => {
      let sql = "select user_id from users u where u.user_name = ?";
      db.all(sql, [username], (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then((response) => {
        console.log("--{}{}{}{}{}{}{}{}{");
        console.log(response);
        console.log("--{}{}{}{}{}{}{}{}{");
        return { userId: response[0].user_id };
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
          console.log(res);
          resolve(res);
        }
      });
    })
      .then((res) => {
        console.log("service", res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getUserDetails: (db, username) => {
    // inner join user_plants up on u.user_id = up.user_id
    console.log(username);
    return new Promise((resolve, reject) => {
      let sql = "select * from users u where u.user_name = ?";
      db.all(sql, [username], (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  },
  updateUserScore: (db, userId, score) => {}, //needs end point
  getLeaderBoards: (db, limit) => {
    //needs endpoint
    let sql =
      "select u.user_id, u.user_name, uh.highscore from users u inner join user_highscore uh on uh.user_id = u.user_id limit ?";
    return new Promise((resolve, reject) => {
      db.all(sql, [limit], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    })
      .then((response) => {
        console.log(response);
        console.log(response);
        console.log("console.log(response)");
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};
