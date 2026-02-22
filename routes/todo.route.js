const express = require("express");
const { getTodos, createTodo } = require("../controllers/todo.controller");
const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
// router.put("/:todoId");
// router.delete("/:todoId");

module.exports = router;
