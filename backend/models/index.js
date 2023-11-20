const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// Option 1: Passing a connection URI
const DB_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(DB_URL);

const User = require("./User")(sequelize, DataTypes);
const List = require("./List")(sequelize, DataTypes);
const Task = require("./Task")(sequelize, DataTypes);
// associations
User.hasMany(List);
List.belongsTo(User);
List.hasMany(Task);
Task.belongsTo(List);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    await sequelize.close();
    console.error("Unable to connect to the database:", error);
  }
})();

(async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (e) {
    console.log(e.message, "error in sync all table");
    await sequelize.close();
  }
})();
module.exports = { sequelize, User, List, Task };
