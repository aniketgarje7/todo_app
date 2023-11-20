const ListModel = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "List",
      timestamps: true,
    }
  );

  return List;
};

module.exports = ListModel;
