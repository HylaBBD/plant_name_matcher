let sql;
const { dbHelper } = require("./helper/database.helper");
const filePath = "./plants.db";
const db = dbHelper.connect(filePath);

sql =
  "CREATE TABLE users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name)";
db.run(sql);

sql =
  "CREATE TABLE user_plants(user_plant_id INTEGER PRIMARY KEY AUTOINCREMENT, plant_id INTEGER, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id))";
db.run(sql);

sql =
  "CREATE TABLE difficulty_setting(difficulty_setting_id INTEGER PRIMARY KEY AUTOINCREMENT, difficulty_display_value)";
db.run(sql);

sql =
  "CREATE TABLE user_difficulty_setting(user_difficulty_setting INTEGER PRIMARY KEY AUTOINCREMENT, plant_id INTEGER, user_id INTEGER, difficulty_setting_id INTEGER,FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (difficulty_setting_id) REFERENCES difficulty_setting(difficulty_setting_id))";
db.run(sql);

sql =
  "CREATE TABLE game_options(game_option_id INTEGER PRIMARY KEY AUTOINCREMENT, type)";
db.run(sql);

sql =
  "CREATE TABLE game_layout(game_layout_id INTEGER PRIMARY KEY AUTOINCREMENT, root_size INTEGER)";
db.run(sql);

sql =
  "CREATE TABLE user_game_result(user_game_result_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, game_option_id INTEGER, game_layout_id INTEGER, win INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (game_option_id) REFERENCES game_option(game_option_id), FOREIGN KEY (game_layout_id) REFERENCES game_layout(game_layout_id))";
db.run(sql);

// const tables = [
//   "user_plants",
//   "user_difficulty_setting",
//   "user_game_result",
//   "game_layout",
//   "game_options",
//   "difficulty_setting",
//   "users",
// ];

// tables.forEach((table) => {
//   sql = `DROP TABLE ${table}`;
//   db.run(sql);
// });
