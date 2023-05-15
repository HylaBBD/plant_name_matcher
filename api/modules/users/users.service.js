module.exports.usersService = {
  createUser: (username) => {
    let sql = `INSERT INTO users[(user_name)] values(${username})`;
    db.run(sql);
  },
  getAllUsers: (db) => {
    const promise = new Promise((resolve, reject) => {
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
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return promise;
  },
};
