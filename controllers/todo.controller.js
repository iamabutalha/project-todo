const Todo = require("../models/todo.model");

exports.getTodos = async (req, res) => {
  const { user } = req;
  try {
    const todos = await Todo.find({ user: user.id }).populate(
      "user",
      "-password",
    );

    return res.send({ isSuccess: true, todos });
  } catch (error) {
    return res
      .status(500)
      .send({ isSuccess: false, message: "Internal server error" });
  }
};

exports.createTodo = async (req, res) => {
  const {
    body: { title, description },
    user,
  } = req;

  if (!title || !description) {
    return res
      .status(400)
      .send({ isSuccess: false, message: "All fields are required" });
  }
  try {
    const todo = await Todo.create({ title, description, user: user.id });
    return res.send({ isSuccess: true, todo });
  } catch (error) {
    return res
      .status(500)
      .send({ isSuccess: false, message: "Internal server error" });
  }
};
