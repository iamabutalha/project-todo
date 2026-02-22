const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

exports.authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(401)
      .send({ isSuccess: false, message: "Token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.send({ isSuccess: false, message: "Internal server error" });
  }
};
