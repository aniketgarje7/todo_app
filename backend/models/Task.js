const TaskModel = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Task",
      timestamps: true,
    }
  );

  return Task;
};

module.exports = TaskModel;
