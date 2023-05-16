module.exports.usersService = {
  createUser: (db, username) => {
    let sql = `INSERT INTO users(user_name) values('${username}')`;
    db.run(sql);
  },
  getAllUsers: (db) => {
    return new Promise((resolve, reject) => {
      let sql = "select * from users";
      db.all(sql, [], (err, res) => {
        if (err) {
          console.log(err);
          console.log("1");
          reject({ message: "Failed retieving all users", error: err });
        } else {
          console.log("1");
          console.log(res);
          resolve(res);
        }
      });
    })
      .then((res) => {
        console.log("2");
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log("2");
        console.log(err);
        return err;
      });
  },
};
