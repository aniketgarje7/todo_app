const Joi = require("joi");
const { deleteTasksByIds } = require("../repository/index.repository");

const deleteTasks = async (req, res) => {
  const schema = Joi.object({
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
  const { tasks } = req.body;
  const deleteRes = await deleteTasksByIds(tasks);
  if (deleteRes.error) {
    return res.status(400).send({
      status: 400,
      message: "Error in DB",
      data: false,
      error: { message: "Error in DB" },
    });
  }
  return res.status(200).send({
    status: 200,
    message: "selected tasks are deleted.",
    data: deleteRes.data,
    error: false,
  });
};

module.exports = { deleteTasks };
