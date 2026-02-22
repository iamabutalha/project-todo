const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

exports.register = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    return res
      .statu(400)
      .send({ isSuccess: false, message: "All fields are required" });
  }

  try {
    const foundUser = await User.findOne({ email, username });
    if (foundUser) {
      return res
        .status(409)
        .send({ isSuccess: false, message: "Username or email already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ fullName, username, email, password: hashPassword });
    return res.send({
      isSuccess: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .send({ isSuccess: false, message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ isSuccess: false, message: "All fields are required" });
  }

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res
        .status(400)
        .send({ isSuccess: false, message: "User does not exist" });
    }

    const isMatchPassword = await bcrypt.compare(password, foundUser.password);

    if (!isMatchPassword) {
      return res
        .status(401)
        .send({ isSuccess: false, message: "Invalid credentials" });
    }

    const { username, id } = foundUser;
    console.log("id: ", id);
    const payload = {
      username,
      email,
      id,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    return res.send({ isSuccess: true, token });
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .send({ isSuccess: false, message: "Internal server error" });
  }
};
