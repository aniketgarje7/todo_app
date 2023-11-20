const Joi = require("joi");
const { createTasks, createList, getListByUserId, updateTaskWithListId } = require("../repository/index.repository");

const create_list = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    tasks: Joi.array().items(Joi.string()).required(),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  const { name, tasks } = req.body;
  const { userId } = req.locals;
  const createdList = await createList(name, userId);
  if (createdList.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }
  const listId = createdList.data.id;
  const bulkTasks = await createTasks(tasks, listId);
  if (bulkTasks.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }

  return res.status(200).send({
    status: 200,
    message: "List of Task successfully created.",
    data: bulkTasks.data,
    error: false,
  });
};

const updateList = async (req, res) => {
  const { taskId, listId } = req.body;
  const schema = Joi.object({
    taskId: Joi.required(),
    listId: Joi.required(),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Data is invalid",
      data: false,
      error: isValid?.error?.details[0],
    });
  }
  const updateData = await updateTaskWithListId(taskId, listId);
  if (updateData.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }
  return res.status(200).send({
    status: 200,
    message: "ListId of Task successfully updated.",
    data: updateData.data,
    error: false,
  });
};

const fetchList = async (req, res) => {
  const { userId } = req.locals;
  const lists = await getListByUserId(userId);
  if (lists.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }
  return res.status(200).send({
    status: 200,
    message: "Lists are fetched.",
    data: lists.data,
    error: false,
  });
};

module.exports = { create_list, updateList, fetchList };
