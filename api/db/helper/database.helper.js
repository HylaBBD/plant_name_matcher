const sqlite = require("sqlite3").verbose();

module.exports.dbHelper = {
  connect: (path) => {
    return new sqlite.Database(path, sqlite.OPEN_READWRITE, (err) => {
      console.error(err);
    });
  },
};
