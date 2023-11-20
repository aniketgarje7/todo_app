const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        // allowNull defaults to true
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      tableName: "User",
      timestamps: true,
    }
  );
  // Model attributes are defined here
  return User;
};

module.exports = UserModel;
// `sequelize.define` also returns the model
