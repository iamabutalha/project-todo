require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const { authMiddleware } = require("./middlewares/auth.middleware");
const authRouter = require("./routes/auth.route");
const todoRouter = require("./routes/todo.route");
const Redis = require("ioredis");
const redisIo = require("./config/redis.js");

const express = require("express");
const app = express();

// redis connection
redisIo.on("connect", () => {
  console.log("redis connected successfully");
});
connectDB();

app.use(cors("*"));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", authMiddleware, todoRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up on port:${PORT}`);
});
