const { User, List, Task } = require("../models");
const { Op } = require("sequelize");

const getUserById = async (username) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    return { data: user, error: null };
  } catch (e) {
    console.log(e.message, "error in getUserById");
    return { error: e, data: null };
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return { data: user, error: null };
  } catch (e) {
    console.log(e.message, "error in getUserById");
    return { error: e, data: null };
  }
};

const createUser = async (name, username, email, password) => {
  try {
    const data = await User.create({ name, username, email, password });
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in createUser");
    return { data: null, error: e };
  }
};

const createList = async (name, userId) => {
  try {
    const data = await List.create({ name: name, UserId: userId });
    console.log(data, "created lists");
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in createList");
    return { data: false, error: e };
  }
};

const getListByUserId = async (userId) => {
  try {
    const data = await List.findAll({ include: Task, where: { UserId: userId }, order: [['createdAt', 'DESC']] });
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in getListByUserId");
    return { data: false, error: e };
  }
};
const createTasks = async (tasks, listId) => {
  const bulkTask = tasks.map((task) => ({ name: task, ListId: listId }));
  try {
    const data = await Task.bulkCreate(bulkTask);
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in createTasks");
    return { data: false, error: e };
  }
};

const updateTaskWithListId = async (taskId, listId) => {
  try {
    const data = await Task.update({ ListId: listId }, { where: { id: taskId } });
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in updateTaskWithListId");
    return { data: false, error: e };
  }
};

const deleteTasksByIds = async (tasks) => {
  try {
    const data = await Task.destroy({
      where: {
        id: {
          [Op.in]: tasks, // Use Op.in to match multiple IDs
        },
      },
    });
    return { data: data, error: false };
  } catch (e) {
    console.log(e.message, "error in delete tasks");
    return { data: false, error: e };
  }
};
module.exports = { getUserById, getUserByEmail, createUser, createList, createTasks, getListByUserId, updateTaskWithListId, deleteTasksByIds };
