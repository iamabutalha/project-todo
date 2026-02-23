const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  updatePost,
} = require("../controllers/todo.controller");
const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:todoId", updatePost);
router.delete("/:todoId", deleteTodo);

module.exports = router;
