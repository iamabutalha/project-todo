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
    console.log(error);

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

exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "PostId is required" });
  }

  try {
    const findTodo = await Todo.findOne({ _id: todoId });

    if (findTodo.user.toString() !== req.user.id.toString()) {
      return res.status(401).send({
        isSuccess: false,
        message: "Unauthorized Cannot delete someone else post",
      });
    }

    const deletePost = await Todo.findByIdAndDelete({
      _id: todoId,
      user: req.user.id,
    });

    if (!deletePost) {
      return res
        .status(404)
        .send({ isSuccess: false, message: "Post does not deleted" });
    }

    return res
      .status(200)
      .json({ isSuccess: false, message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ isSuccess: false, message: "internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;

  if (!todoId) {
    return res
      .status(409)
      .json({ isSuccess: false, message: "postId is required" });
  }
  try {
    // Todo
    const findTodo = await Todo.findOne({ _id: todoId });
    if (!findTodo)
      return res
        .status(409)
        .json({ isSuccess: false, message: "Post not found" });

    if (findTodo.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ isSuccess: false, message: "Cannot update this post" });
    }

    const updatedPost = await Todo.findByIdAndUpdate(
      { _id: todoId, user: req.user.id },
      { title },
      { new: true },
    );
    res.status(200).json({
      isSuccess: false,
      message: "Todo updated successfully",
      todo: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isSuccess: false, message: "internal sever error" });
  }
};
